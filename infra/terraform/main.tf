terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "castquest-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "castquest-cluster"
  cluster_version = "1.28"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    main = {
      min_size     = 2
      max_size     = 10
      desired_size = 3

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Environment = var.environment
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  identifier             = "castquest-db"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.t3.medium"
  allocated_storage      = 100
  storage_type           = "gp3"
  db_name                = "castquest"
  username               = var.db_username
  password               = var.db_password
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  skip_final_snapshot    = var.environment != "production"

  tags = {
    Environment = var.environment
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "castquest-db-subnet"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Environment = var.environment
  }
}

resource "aws_security_group" "db" {
  name        = "castquest-db-sg"
  description = "Security group for RDS PostgreSQL"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }

  tags = {
    Environment = var.environment
  }
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "castquest-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.main.name
  security_group_ids   = [aws_security_group.redis.id]

  tags = {
    Environment = var.environment
  }
}

resource "aws_elasticache_subnet_group" "main" {
  name       = "castquest-redis-subnet"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_security_group" "redis" {
  name        = "castquest-redis-sg"
  description = "Security group for Redis"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }

  tags = {
    Environment = var.environment
  }
}
