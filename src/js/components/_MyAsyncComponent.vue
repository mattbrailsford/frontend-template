<template>
    <div>
        <button class="px-4 py-2 bg-blue text-white cursor-pointer"><slot></slot></button>
        <br />
        {{ myProp }}
    </div>
</template>

<script>
export default {
    name: 'MyAsyncComponent',
    props: ['myProp']
}
</script>