<?php
echo json_encode([
    'route'=>'add-to-cart.php',
    'id'=>"1",
    'quantity'=>1,
    'title'=>'ASHWOOD',
    'description'=>'Рюкзак Ashwood Leather 1663 Chestnut',
    'label'=>[
        [
            'text'=>'Новинка',
            'className'=>'_new',
            'altcolor'=>'#27ae60'
        ]
    ],
    'availability'=>[
        'text' => 'В наличии',
        'className'=>'_in-stock',
        'color'=>'#27ae60',
        'icon'=>'icon-selected'
    ],
    'price'=>'15 000',
    'altprice'=>'18 000',
    'characteristic'=>[
        [
            'label'=>'Модель',
            'value'=>'AL1663/108'
        ],[
            'label'=>'Пол',
            'value'=>'Мужчины'
        ],[
            'label'=>'Материал',
            'value'=>'Натуральная кожа'
        ],[
            'label'=>'Размер, см',
            'value'=>'25 см'
        ]
    ],
    'images'=>[
        "media/popup-product/1.jpg",
        "media/popup-product/2.jpg",
        "media/popup-product/3.jpg",
        "media/popup-product/4.jpg",
        "media/popup-product/1.jpg",
        "media/popup-product/1.jpg",
        "media/popup-product/2.jpg",
        "media/popup-product/3.jpg",
        "media/popup-product/4.jpg",
        "media/popup-product/1.jpg"
    ]
    
]);