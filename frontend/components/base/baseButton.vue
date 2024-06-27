<template>
    <v-btn>
        {{buttonText}}
    </v-btn>

</template>

<script>
export default{
    name:'ButtonComponent ',
    props:{
        buttonText:{
            type:String
        }
    }
}
</script>