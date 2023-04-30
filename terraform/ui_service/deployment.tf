resource "kubernetes_deployment" "ui_service_deployment" {
  depends_on = [kubernetes_config_map.ui_service_config_map]
  metadata {
    name = local.ui_deployment_label
    labels = {
      App = local.ui_deployment_label
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        App = local.ui_deployment_label
      }
    }
    template {
      metadata {
        labels = {
          App = local.ui_deployment_label
        }
      }
      spec {
        container {
          image             = var.ui_service_image
          name              = local.ui_service_label
          image_pull_policy = "Always"

          port {
            container_port = local.ui_service_port
          }

          resources {
            limits = {
              cpu    = "0.5"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "50Mi"
            }
          }
          env_from {
            config_map_ref {
              name = local.ui_service_config_map
            }
          }
          readiness_probe {
            http_get {
              path = "/"
              port = 80
            }
          }
          liveness_probe {
            http_get {
              path = "/"
              port = 80
            }
          }
        }
      }
    }
  }
}
