variable "aws_region" {
  description = "The AWS region where resources will be created."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "The custom domain name for the website."
  type        = string
  # No default, force the user to provide one.
}

variable "repository_url" {
  description = "The URL of the GitHub repository."
  type        = string
}

variable "aws_profile_for_terraform" {
  description = "The AWS profile in the user's system that Terraform uses."
  type        = string
}
