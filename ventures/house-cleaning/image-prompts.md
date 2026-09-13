# 画像の制作記録

2026年9月14日。内蔵 image_gen を使用。各1回、計3画像を生成。画像は架空店舗向けの素材で、実在の清掃実績を表さない。

## logo.png

Use case: logo-brand.
Asset type: wide website wordmark logo on pure white background.
Primary request: A simple elegant Japanese typographic wordmark for a fictional Kyoto house-cleaning business. Exact main text: "京すみか". Exact small descriptor: "ハウスクリーニング".
Composition: landscape 3:1, centered wordmark with tasteful compact margins, descriptor clearly beneath. Main text generously sized and extremely legible, sophisticated Japanese type. Very dark navy blue #14223c lettering, pure white #ffffff background.
Constraints: Render Japanese text exactly as given. No extra text, no icon, no texture, no gradient, no shadow, no decorative frame, no watermark. Clean flat digital graphic.

## hero.png

Use case: photorealistic-natural.
Asset type: website right-column hero image for fictional Kyoto home cleaning business.
Primary request: Landscape 3:2 photorealistic editorial photograph of a freshly cleaned, lived-in modern Kyoto home kitchen. White tile backsplash, brushed stainless steel sink, warm oak accents, soft morning daylight. Modest and believable Japanese home, beautifully clean but not a luxury palace.
Composition: appealing close interior view of the sink, clean counter and kitchen details, eye-level editorial photography, enough context to recognize an everyday home, no exaggerated wide-angle perspective.
Lighting and palette: soft morning light, bright white, natural oak, subtle restrained cobalt-blue household accent consistent with a #1647df and white website.
Constraints: No people, no text, no logos, no watermark, no before/after comparison. This is a generated illustrative photo, not evidence of actual cleaning work.

## design-preview.png

Use case: ui-mockup.
Asset type: high-fidelity desktop website mockup reference for a fictional Kyoto house-cleaning service.
Primary request: Minimal editorial Japanese website for brand "京すみか". Wide desktop screenshot-like mockup, 3:2 overall landscape, crisp clean design, generous typography and whitespace, white background, cobalt #1647df, dark navy #14223c.
Layout: header with wordmark "京すみか", small descriptor "ハウスクリーニング", navigation "サービス・料金" "ご利用の流れ" "よくある質問", and cobalt button "無料で相談する". Main hero split into left typography and right photorealistic bright modern everyday Kyoto kitchen with white tile, stainless sink, oak accents, no people. Eyebrow on left exactly "京都市のハウスクリーニング". Large headline on two lines exactly:
"掃除の先に、"
"ゆとりのある毎日を。"
Supporting copy "水まわりの気になる汚れを、すっきり。暮らしに合わせて、必要な場所から。"
Cobalt main CTA exactly "料金とサービスを見る".
Below hero, a horizontal three-column pricing strip with clear fine dividers: "浴室" "15,400円", "キッチン" "14,300円", "レンジフード" "13,200円". Small caption "税込・標準作業料金".
Constraints: Native-looking polished Japanese typography, highly legible exact provided text, flat webpage design, no browser frame, no device frame, no floating decorative cards, no gradients, no glowing effects, no extra logos. This image is a design reference, not a full website asset.

## 実装への反映

モックの青・白・濃紺、明朝の見出し、右側のキッチン写真、3種の料金を踏襲。実装では読みやすさのため見出しを写真と分離し、画面幅に合わせて改行する。画像内の文字をそのままサイトとして使わず、日本語のHTML本文で実装した。
