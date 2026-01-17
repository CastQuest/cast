$root = "docs-site"

function To-TitleCase {
    param([string]$Text)
    return ($Text -split "-" | ForEach-Object {
        $_.Substring(0,1).ToUpper() + $_.Substring(1)
    }) -join " "
}

Get-ChildItem -Path $root -Recurse -Filter *.mdx | ForEach-Object {
    $file = $_.FullName
    $folder = Split-Path $file -Parent | Split-Path -Leaf
    $slug = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)

    # Generate clean titles
    if ($slug -eq "index") {
        $title = To-TitleCase $folder
    } else {
        $title = To-TitleCase $slug
    }

    # Read file
    $content = Get-Content $file -Raw

    # Replace frontmatter title
    $content = $content -replace '(?m)^title:\s*".*"$', "title: `"$title`""

    # Replace H1 heading
    $content = $content -replace '(?m)^#\s+.*$', "# $title"

    # Write back
    Set-Content -Path $file -Value $content -Encoding UTF8

    Write-Host "Fixed title in: $file" -ForegroundColor Cyan
}

Write-Host "CASTQUEST V3 — All titles normalized." -ForegroundColor Green
