terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.52.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.1"
    }
  }
  cloud {
    hostname     = "app.terraform.io"
    organization = "Arxiv-Insanity"
    workspaces {
      name = "ui-service"
    }
  }
}

provider "google" {
  project = data.terraform_remote_state.infra.outputs.google_project_details.project
  region  = data.terraform_remote_state.infra.outputs.google_project_details.region
  zone    = data.terraform_remote_state.infra.outputs.google_project_details.zone
}

data "terraform_remote_state" "infra" {
  backend = "remote"
  config = {
    organization = "Arxiv-Insanity"
    workspaces = {
      name = "app-infra"
    }
  }
}

data "google_client_config" "default" {}

data "google_container_cluster" "my_cluster" {
  name     = data.terraform_remote_state.infra.outputs.gke_outputs.cluster_name
  location = data.terraform_remote_state.infra.outputs.gke_outputs.location
}

provider "kubernetes" {
  host = "https://${data.terraform_remote_state.infra.outputs.gke_outputs.cluster_host}"

  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(data.google_container_cluster.my_cluster.master_auth[0].cluster_ca_certificate)
}


data "terraform_remote_state" "backend_service" {
  backend = "remote"
  config = {
    organization = "Arxiv-Insanity"
    workspaces = {
      name = "backend-service"
    }
  }
}

module "ui_service" {
  source           = "./ui_service"
  ui_service_image = var.ui_service_image
  backend_api_url  = "http://${data.terraform_remote_state.backend_service.outputs.backend_service_outputs.backend_service_ip}.nip.io"
}
