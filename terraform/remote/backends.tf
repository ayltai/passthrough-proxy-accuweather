terraform {
  required_version = ">=0.13"

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "passthrough-proxy-accuweather"

    workspaces {
      prefix = "aws-"
    }
  }
}
