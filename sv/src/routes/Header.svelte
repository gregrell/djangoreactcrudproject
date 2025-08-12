<script lang="ts">
    let{
        name,
        fake_name = null}:{
        name:string;
        fake_name?: string|null}  = $props(); //props rune. setting types using typescript syntax. 
                                        //if the variable is declared here, it becomes required. 
                                        //if putting a question mark after it, it is optional
</script>


<h1>Hello  {name} and optionally hello {fake_name}</h1>

<style>

</style>