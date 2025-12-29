# TODO: dev and prod environments
# TODO: variables
provider "aws" {
  access_key = "mock_access_key"
  secret_key = "mock_secret_key"
  region = "us-east-2"

  s3_use_path_style = true
  skip_credentials_validation = true
  skip_metadata_api_check = true
  skip_requesting_account_id = true

  endpoints {
    s3 = "http://localhost:4566"
  }
}

resource "aws_s3_bucket" "formbean_bucket" {
  bucket = "formbean"
}