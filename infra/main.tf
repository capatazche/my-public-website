terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  profile = "bernardovc-terraform-admin"
}

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

variable "github_oauth_token" {
  description = "GitHub Personal Access Token for Amplify to access the repository."
  type        = string
  sensitive   = true
}

resource "aws_amplify_app" "personal_website" {
  name       = "personal-website"
  repository = "https://github.com/capatazche/my-public-website"

  # Secure way to provide the Github token using the variable we defined above.
  oauth_token = var.github_oauth_token

  # amplify.yml build configuration
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        build:
          commands:
            - npm install
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

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "" # This maps the root domain
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www" # This maps the www subdomain
  }
}