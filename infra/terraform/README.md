# CASTQUEST V3 - Terraform Infrastructure

This directory contains Terraform configuration for AWS infrastructure.

## Prerequisites

- Terraform >= 1.6.0
- AWS CLI configured with appropriate credentials
- Access to AWS account with admin permissions

## Bootstrap Process

Before using the S3 backend, you must create the state bucket and DynamoDB table:

### Step 1: Initial Setup (Local State)

```bash
cd infra/terraform

# Comment out the backend block in main.tf temporarily
# OR use local backend
terraform init

# Create bootstrap resources
terraform apply -target=aws_s3_bucket.terraform_state \
                -target=aws_s3_bucket_versioning.terraform_state \
                -target=aws_s3_bucket_server_side_encryption_configuration.terraform_state \
                -target=aws_s3_bucket_public_access_block.terraform_state \
                -target=aws_dynamodb_table.terraform_lock
```

### Step 2: Migrate to S3 Backend

```bash
# Uncomment the backend block in main.tf
# Re-initialize with S3 backend
terraform init -migrate-state

# Confirm the migration when prompted
```

### Step 3: Deploy Application Infrastructure

```bash
# Plan changes
terraform plan -out=tfplan

# Apply infrastructure
terraform apply tfplan
```

## Resources Created

### Bootstrap Resources (bootstrap.tf)
- **S3 Bucket**: `castquest-terraform-state` - Stores Terraform state
- **DynamoDB Table**: `terraform-state-lock` - State locking

### Application Resources (main.tf)
- **S3 Bucket**: `castquest-{env}-assets` - Static assets storage
- **CloudFront**: CDN distribution for assets
- **ECR Repositories**: Docker image repositories (web, indexer)
- **Secrets Manager**: Application secrets storage
- **IAM Role**: GitHub Actions OIDC role with deployment permissions
- **OIDC Provider**: GitHub Actions identity provider

## Environment Variables

Set these before running Terraform:

```bash
export TF_VAR_environment=production  # or staging
export TF_VAR_aws_region=us-east-1
export TF_VAR_project_name=castquest
```

## Customization

### Unique Bucket Names

S3 bucket names must be globally unique. Update the bucket name in `main.tf`:

```hcl
resource "aws_s3_bucket" "assets" {
  bucket = "${var.project_name}-${var.environment}-assets-${data.aws_caller_identity.current.account_id}"
}
```

### Multi-Environment Setup

To manage multiple environments:

```bash
# Create workspace per environment
terraform workspace new staging
terraform workspace new production

# Switch between environments
terraform workspace select production

# Or use separate state keys
terraform apply -var="environment=staging"
```

## Outputs

After applying, Terraform outputs:

- `s3_bucket_name`: Assets bucket name
- `cloudfront_distribution_id`: CDN distribution ID
- `cloudfront_domain_name`: CDN domain
- `ecr_web_repository_url`: Web app ECR URL
- `ecr_indexer_repository_url`: Indexer ECR URL
- `github_actions_role_arn`: IAM role ARN for CI/CD

## GitHub Actions Integration

The IAM role created includes policies for:
- ECR push/pull operations
- S3 bucket management
- CloudFront invalidations
- Secrets Manager access

Use in GitHub Actions with OIDC:

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
    aws-region: us-east-1
```

## Security Notes

1. **State File**: Contains sensitive data - ensure S3 bucket encryption is enabled
2. **DynamoDB**: Use on-demand billing to avoid costs during inactivity
3. **OIDC**: Limits GitHub Actions to `CastQuest/cast` repository
4. **Secrets**: Never commit actual secrets - use Secrets Manager or environment variables

## Validation

```bash
# Format check
terraform fmt -check

# Validate configuration
terraform validate

# Security scan (optional)
tfsec .
```

## Cleanup

To destroy all resources:

```bash
# Destroy application resources
terraform destroy

# Destroy bootstrap resources (if needed)
terraform destroy -target=aws_dynamodb_table.terraform_lock \
                  -target=aws_s3_bucket.terraform_state
```

**Warning**: This will delete all infrastructure. Ensure you have backups of important data.

## Troubleshooting

### State Locking Issues

If state is locked:

```bash
# List locks
aws dynamodb scan --table-name terraform-state-lock

# Force unlock (use with caution)
terraform force-unlock <LOCK_ID>
```

### Backend Migration Failed

If migration fails:

```bash
# Reconfigure backend
terraform init -reconfigure

# Or start fresh
terraform init -migrate-state
```

## Further Reading

- [Terraform S3 Backend](https://www.terraform.io/docs/backends/types/s3.html)
- [AWS OIDC with GitHub Actions](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)
