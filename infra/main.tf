terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "bernardovc-terraform-admin"
}

# ---- Developer ----
resource "aws_iam_user" "bernardo_developer" {
  name = "bernardo.villalba"
  path = "/users/"
}

resource "aws_iam_user_policy_attachment" "bernardo_admin_attachment" {
  user       = aws_iam_user.bernardo_developer.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_user_login_profile" "bernardo_login" {
  user = aws_iam_user.bernardo_developer.name
  password_reset_required = true
}

output "bernardo_developer_password" {
  description = "The initial temporary password for the bernardo.villalba user."
  value       = aws_iam_user_login_profile.bernardo_login.password
  sensitive   = true
}

# ---- Amplify CI/CD ----

resource "aws_iam_role" "amplify_service_role" {
  name = "amplify-personal-website-role"

  # This is the "Trust Relationship" policy.
  # It allows the Amplify service to assume this role.
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = [
            "amplify.amazonaws.com",
            "amplify.${var.aws_region}.amazonaws.com"
          ]
        }
      }
    ]
  })
}

# This attaches the standard AWS-managed policy for Amplify deployments to our new role.
resource "aws_iam_role_policy_attachment" "amplify_role_policy" {
  role       = aws_iam_role.amplify_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess-Amplify"
}

resource "aws_amplify_app" "personal_website" {
  name                 = "personal-website"
  iam_service_role_arn = aws_iam_role.amplify_service_role.arn

  # After applying this -> connect to repo manually on Amplify console
  repository = "https://github.com/capatazche/my-public-website"

  # amplify.yml build configuration
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - nvm use 20
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.personal_website.id
  branch_name = "main"
  framework   = "React"
  stage       = "PRODUCTION"
}

resource "aws_amplify_domain_association" "main" {
  app_id      = aws_amplify_app.personal_website.id
  domain_name = "bernardovc.dev"

  # Temporarily disabled for first run (to configure DNS, avoid chicken and egg problem)
  wait_for_verification = true

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "" # This maps the root domain
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www" # This maps the www subdomain
  }
}

output "amplify_dns_verification_record" {
  description = "The CNAME record needed to verify the Amplify domain for SSL."
  value       = aws_amplify_domain_association.main.certificate_verification_dns_record
}