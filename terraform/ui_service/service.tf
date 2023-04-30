resource "kubernetes_service" "ui_service_service" {
  metadata {
    name = local.ui_service_label
  }
  spec {
    selector = {
      App = local.ui_deployment_label
    }
    port {
      port        = local.ui_service_port
      target_port = local.ui_service_port
    }

    type = "NodePort"
  }
}
