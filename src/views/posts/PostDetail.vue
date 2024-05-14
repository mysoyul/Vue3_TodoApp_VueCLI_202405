<template>
    <div>
        <h2>PostDetail {{route.params.id}}
</h2>
    </div>
</template>

<script>
import { useRoute } from "vue-router"
export default {    
    setup () {
        const route = useRoute();    

        return {route}
    }
}
</script>

<style scoped>

</style>