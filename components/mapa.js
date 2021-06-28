Vue.component('mapa', {
  template: `
    <div>
      <div id="mapid"></div>
    </div>
  `,
  props: ["usuario"],
  data: function() {
    return {
      mapa: null,
      marca: null,
    }
  },
  methods: {
    posicionar(event) {
      let posicion = this.marca.getLatLng();
      let respuesta = {
        id: this.usuario.id,
        lat: posicion.lat,
        lng: posicion.lng,
      }
      this.$emit("reposicionar",respuesta);
    }
  },
  mounted() {
      this.mapa = L.map('mapid').setView([0, 0], 1);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiYWNyZXNwb3IiLCJhIjoiY2s2anhsdGEzMDB4bDNscno5enQ0c2tobSJ9.YGPn0cbC9hotv5naShnxLg'
      }).addTo(this.mapa);
  },
  watch: {
    usuario: function(n) {
      if (this.marca) this.marca.removeFrom(this.mapa);
      if (n) {
        this.marca = L.marker(n.address.geo,{
          draggable: true,
        });
        this.mapa.setView(n.address.geo,3);
        this.marca.bindPopup("<b>"+n.name+"</b><br>"+n.company.name).openPopup();
        this.marca.on('dragend', this.posicionar);
        this.marca.addTo(this.mapa);
      }
    }
  }
})
