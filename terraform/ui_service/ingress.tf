resource "kubernetes_ingress_v1" "ui_ingress" {
  wait_for_load_balancer = true
  metadata {
    name = local.ui_service_ingress
    annotations = {
      "kubernetes.io/ingress.class" = "gce"
    }
  }
  spec {
    rule {
      http {
        path {
          path = "/*"
          backend {
            service {
              name = local.ui_service_label
              port {
                number = local.ui_service_port
              }
            }
          }
        }
      }
    }
  }
}