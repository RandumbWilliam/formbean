# Local backend for localstack
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}