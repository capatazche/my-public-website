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