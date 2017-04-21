# jquery.smoothscroll

## Get started

### Install
```
$ yarn add jquery.smoothscroll
```

### Load scripts

```
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="/node_modules/jquery.smoothscroll/dist/jquery.smoothscroll.min.js"></script>
```

### Setting

```
<script>
jQuery(function($) {
  $('a[href^="#"]').SmoothScroll({
    duration: 1000,
    easing  : 'easeOutQuint'
  });
});
</script>
```

## License
MIT
