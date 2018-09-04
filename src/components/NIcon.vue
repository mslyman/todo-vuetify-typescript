<template>
  <svg :class="[{'n-icon': true}, small ? 'n-icon_small' : '', medium ? 'n-icon_medium' : '', large ? 'n-icon_large' : '', right ? 'n-icon--right' : '', left ? 'n-icon--left' : '']" :viewBox="viewBox ? viewBox : '0 0 24 24'">
    <use :href="'#' + ($slots.default ? $slots.default[0].text : '')" :xlink:href="'#' + ($slots.default ? $slots.default[0].text : '')"></use>
  </svg>
</template>

<script>
/** Usage: 
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
	<defs>
		<g id="icon-plus">
			<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
		</g>
		<g id="icon-menu">
			<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
		</g>
	</defs>
</svg>

<n-icon>icon-plus</n-icon>

Icom images are from https://materialdesignicons.com/
*/
export default {
  name: "n-icon",
  props: {
    viewBox: String,
    small: Boolean,
    medium: Boolean,
    large: Boolean,
    left: Boolean,
    right: Boolean
  }
}
</script>

<style>
.n-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  vertical-align: middle;
  /* shape-rendering: crispEdges; */
}
.n-icon_small {
  width: 16px;
  height: 16px;
}
.n-icon_medium {
  width: 28px;
  height: 28px;
}
.n-icon_large {
  width: 36px;
  height: 36px;
}
.v-btn .n-icon--right {
  margin-left: 16px;
}
.v-btn .n-icon--left {
  margin-right: 16px;
}
</style>