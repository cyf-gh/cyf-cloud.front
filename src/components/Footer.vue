// src/components/Footer.vue
<template>
    <footer class=" navbar-fixed-bottom container py-5">
        <div class="row">
            <div class="col-6 col-md">
                <h5>联系方式</h5>
                <ul class="list-unstyled text-small">
                    <li><a class="text-muted">QQ：1026279833</a></li>
                    <li><a class="text-muted">微信：cyf_tx</a></li>
                    <li><a class="text-muted">邮箱：cyf-ms@hotmail.com</a></li>
                    <li><a class="text-muted" href="github.com/cyf-gh">Github</a></li>
                    <li><a class="text-muted" href="https://space.bilibili.com/3087782">哔哩哔哩</a></li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <h5>捐赠</h5>
                <ul class="list-unstyled text-small">
                    <li></li>
                    <li><a class="text-muted" href="/donate">前往捐赠</a></li>
                </ul>
            </div>
            <div class="col-12 col-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img"
                    viewBox="0 0 24 24" focusable="false">
                    <title>Product</title>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path
                        d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94">
                    </path>
                </svg>
                <small class="d-block mb-3 text-muted">cyf 2020</small>
            </div>
                <div class="col-12 col-md">
                    <b-badge pill variant="light">
                    <span id="busuanzi_container_site_pv">访问量<span id="busuanzi_value_site_pv"></span>次</span>
                    </b-badge>
                    </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}    
</script>
