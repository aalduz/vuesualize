<template>
    <ul class="nav nav-pills">
        <router-link to="/" tag="li" active-class="active" class="nav-item"><a class="nav-link">Home</a></router-link>
        <router-link to="/user" tag="li" active-class="active" class="nav-item"><a class="nav-link">User</a></router-link>
        <router-link to="/journey" tag="li" active-class="active" class="nav-item"><a class="nav-link">Journeys</a></router-link>
    </ul>
</template>
<script>
export default {
  
}
</script>

<style lang="sass">
    @import "../../styles/index";
</style>
