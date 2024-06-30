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
  `(div ([class "mr-1.5 mb-2"])
		(div ([class ,"flex items-center rounded-full bg-[@{celadon}]/10 px-4 py-2 text-sm font-medium leading-5 text-[@{celadon}]"]) ,topic)))

; (->badges "Haskell, Nix, Racket")
(define (->badges topics)
  (let ([top-list (map (curry string-trim #:left? #t) 
  					   (string-split topics ","))])
    `(div ([class "flex flex-wrap justify-center"] [aria-label "Tools/Techniques used"])
         ,(for/splice ([topic top-list]) (badge topic)))))

(define (link text url)
  `(a ([class ,"text-[@{jordy}] hover:underline decoration-2 underline-offset-2 decoration-[@{jordy}] hover:text-[@{jordy}]"] [rel "noreferrer noopener"] [target "_blank"] [href ,url])
    ,text))

(define (id-ify text)
  (string-replace (string-downcase text) " " "-"))

(define (heading text)
  `(h1 ([id ,(id-ify text)] [class ,"text-3xl font-fira-code text-[@{jordy}] tracking-tighter leading-snug"])
       ,text))
