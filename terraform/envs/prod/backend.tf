# Remote S3 backend for prod
# Comment this out initially until bootstrap is complete
terraform {
  backend "s3" {
    bucket         = "formbean-prod-terraform-state" # Must match bootstrap bucket name
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}