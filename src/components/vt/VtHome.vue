<template>
    <div>
        <b-overlay
          id="overlay-background"
          show
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          rounded="sm"
        >
        <iframe class="cc-iframe" src="https://bilibili.com" frameborder="no"  security="restricted" sandbox="allow-scripts allow-forms allow-same-origin allow-popups"></iframe>
                </b-overlay>
    </div>
</template>

<style scoped>
    .cc-iframe {
        width: 100%;
        height: 40rem;
    }
</style>