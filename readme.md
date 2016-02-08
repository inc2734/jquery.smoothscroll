# Get started

## 1.Load scripts

```javascript
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="/path/to/jquery.smoothScroll.js"></script>
```

## 2.Setting

```javascript
<script>
jQuery( function( $ ) {
	$( 'a[href^="#"]' ).SmoothScroll( {
		duration: 1000,
		easing  : 'easeOutQuint'
	} );
} );
</script>
```
