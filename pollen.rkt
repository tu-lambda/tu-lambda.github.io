#lang racket

(require pollen/core
         string-interpolation)

(define raisin-black "#1F2030")
(define celadon "#A7D995")
; (define celadon-light "#97b6f0")
(define jordy "#8AADF4")
(define jordy-light "#8AADF4")

(provide (all-defined-out))

(define (badge topic)
  `(li ([class "mr-1.5 mb-2"])
		(div ([class ,"flex items-center rounded-full bg-[@{celadon}]/10 px-3 py-1 text-xs font-medium leading-5 text-[@{celadon}]"]) ,topic)))

; (->badges "Haskell, Nix, Racket")
(define (->badges topics)
  (let ([top-list (map (curry string-trim #:left? #t) 
  					   (string-split topics ","))])
    `(ul ([class "flex flex-wrap justify-center"] [aria-label "Tools/Techniques used"])
         ,(for/splice ([topic top-list]) (badge topic)))))

