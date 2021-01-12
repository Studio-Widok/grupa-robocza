<?php
  $items = [
    [
      'image' => 'example.jpg',
      'name'  => 'Kuba Kulesza',
      'text'  => '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit quo quasi facere recusandae, possimus alias beatae dolores enim, voluptas nostrum velit. Corrupti culpa et ipsum corporis cum, itaque modi.</p>',
    ],
    [
      'image' => 'example.jpg',
      'name'  => 'Kuba Kulesza',
      'text'  => '<p>Repellendus sequi consequuntur ipsa praesentium expedita, aut non vitae nostrum dicta cum odio saepe, quibusdam ea officiis blanditiis ab velit! Nihil veritatis sunt, tempore ab dolores dicta assumenda enim aut.</p>',
    ],
    [
      'image' => 'example.jpg',
      'name'  => 'Kuba Kulesza',
      'text'  => '<p>Voluptas ea rerum autem consequatur cumque recusandae laborum, assumenda architecto fugiat harum nesciunt corrupti exercitationem. Sed, at autem? Harum molestias sit tenetur quo accusantium rem soluta voluptatem delectus. Voluptatibus, saepe.</p>',
    ],
    [
      'image' => 'example.jpg',
      'name'  => 'Kuba Kulesza',
      'text'  => '<p>Minima beatae eligendi, optio nulla sint nisi quod illum accusantium corporis dolores, sunt quaerat, impedit expedita id recusandae tempore. Placeat aliquam, nemo hic deleniti id distinctio debitis quia laboriosam nesciunt.</p>',
    ],
    [
      'image' => 'example.jpg',
      'name'  => 'Kuba Kulesza',
      'text'  => '<p>Consequuntur tempore unde provident eos quidem reprehenderit, quis mollitia similique earum dignissimos sint nulla porro ipsum laborum doloremque, delectus laudantium non eligendi commodi deleniti minima temporibus exercitationem est. Sapiente, ut.</p>',
    ],
    [
      'image' => 'example.jpg',
      'name'  => 'Kuba Kulesza',
      'text'  => '<p>Eum quo ut quisquam esse assumenda cumque rerum similique ipsum, dolorem ratione iste repudiandae. Cum, animi. Sed ullam nobis ipsam quisquam accusantium mollitia vero consequatur ut natus provident. Ad, ab.</p>',
    ],
  ];

  include __DIR__ . '/parts/header.php';
?>

<div class="text-container" id="container-subpage">
  <?php include __DIR__ . '/parts/top.php';?>
  <div class="content flex flex-wrap flex-justify-space-between">
    <?php foreach ($items as $item) {?>
    <div class="item col3 column-inner">
      <div class="item-img cake"
        style="background-image: url('media/<?=$item['image']?>')"></div>
      <div class="item-name"><?=$item['name']?></div>
      <div class="item-text"><?=$item['text']?></div>
    </div>
    <?php }?>
  </div>
</div>

<?php include __DIR__ . '/parts/line-container.php';?>
<?php include __DIR__ . '/parts/footer.php';?>
