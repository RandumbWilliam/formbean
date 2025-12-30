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

module "my_bucket" {
  source = "../../modules/s3"

  bucket_name       = var.bucket_name
  enable_versioning = true
  enable_encryption = true
  tags              = var.tags
}