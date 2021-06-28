Vue.component('usuario', {
    template: `
        <div class="usuario">
        <h1>{{user.company.name}}</h1>
        <h2>{{user.name}}</h2>
        <p>Lat: {{user.address.geo.lat}}</p>
        <p>Lng: {{user.address.geo.lng}}</p>
        <button @click="$emit('borrar',user)">Borrar</button>
        <button @click="$emit('mostrar',user)">Mostrar</button>
        </div>
    `,
    props: ['user'],
})