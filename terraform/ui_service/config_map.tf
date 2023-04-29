resource "kubernetes_config_map" "ui_service_config_map" {
  metadata {
    name = local.ui_service_config_map
  }

  data = {
    API_URL = var.backend_api_url
  }
}