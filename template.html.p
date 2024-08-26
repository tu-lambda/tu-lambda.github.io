◊(require string-interpolation)

◊(define title "Functional Coders Tübingen")
◊(define description "What if... we just take the best parts of prgogramming and see where this leads us?")
◊(define image-path "")
◊(define url "https://functional-coders.github.io/")
◊(define icon-path "")

<!DOCTYPE html>
<html lang="de-DE" class="sm:scroll-smooth">
  <head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta property="og:locale" value="en_US">
	<meta property="og:type" value="website">
	<meta property="og:site_name" content="◊|title|" >
	<meta property="og:url" value="◊|url|" >
	<meta property="og:image" value="◊|image-path|" >
	<meta property="og:image:secure_url" content="◊|url|" />
	<meta property="og:image:type" content="image/jpg">
	<meta property="og:image:width" content="800">
	<meta property="og:image:height" content="1200">
	<meta property="og:image:alt" content="◊|title|" >
	<meta property="og:title" value="◊|title|" >
	<meta property="og:description" value="◊|description|" >

	<meta property="twitter:title" value="◊|title|" >
	<meta property="twitter:description" value="◊|description|" >
	<meta property="twitter:url" value="◊|url|" >
	<meta property="twitter:image" value="◊|image-path|" >

	<title>◊|title|</title>
	<meta name="description" content="◊|description|" >
	<link rel="icon" type="image/x-icon" href="◊|icon-path|">

	<link rel="stylesheet" href="fonts.css"> 
	<script src="https://cdn.tailwindcss.com"></script>
  </head>
	<body class="antialiased scroll-smooth font-fira-sans selection:bg-[◊|jordy-light|] selection:text-[◊|raisin-black|]">
		◊(->html `(div ([class ""])
										,doc))
		<footer class="p-6 sm:p-8 md:p-12">
			<div class="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-sm text-zinc-400">
				<div class="flex flex-wrap gap-x-2 justify-center">
					<p class="">
						Made with
					</p>
					<p class="">
						❤️
					</p>
					<p class="whitespace-nowrap">
						by Tü.λ
					</p>
				</div>
				◊; <div class="flex gap-4 sm:gap-6 md:gap-8">
				◊; 	<a href="/terms">
				◊; 		<p class="whitespace-nowrap">Terms</p>
				◊; 	</a>
				◊; 	<a href="/imprint">
				◊; 		<p class="whitespace-nowrap">Imprint</p>
				◊; 	</a>
				◊; 	<a href="/privacy-policy">
				◊; 		<p class="whitespace-nowrap">Privacy Policy</p>
				◊; 	</a>
				◊; </div>
			</div>
		</footer>
	</body>
</html>
