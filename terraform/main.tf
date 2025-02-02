terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = ">= 1.35.0"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_ssh_key" "contdel-key" {
  name       = "contdel-key"
  public_key = var.ssh_public_key
}

resource "hcloud_server" "contdel-server" {
  name        = "contdel-server"
  image       = "ubuntu-22.04"
  server_type = "cx22"
  location    = "nbg1"
  ssh_keys    = [hcloud_ssh_key.contdel-key.id]
}