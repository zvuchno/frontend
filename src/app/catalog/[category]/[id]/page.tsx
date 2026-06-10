// при клике на карточку передватать помимо id еще тип карточки (артист / релиз / мерч)
// на этой странице получать детальный продукт
// рендерить контент страницы в зависимости от типа, передавая в него данные, полученные о продукте:
// ArtistPageContent.tsx (принимает: id, product)
// ReleasePageContent.tsx (принимает: id, product)
// MerchPageContent.tsx (принимает: id, product)

import MerchPageContent from "./merchPageContent/MerchPageContent";


const DetailPage = async ({ params }: {params: Promise<{ id: string }>}) => {

  const { id } = await params;

  // получаем product по id
  // если product.hasOwnProperty('kind'), то рендерим MerchPageContent
  // если product.hasOwnProperty('is_single'), то рендерим ReleasePageContent
  // ArtistPageContent
  const merch = {
    id: 370,
    name: 'Северный Шум Night Cap',
    description: '[fixture:test_server_content:merch:severny-shum:cap:10] Fixture ночная кепка Северный Шум.',
    price: 1490.0,
    allow_overpay: false,
    kind: 'Кепка',
    property_name: 'Цвет',
    stock: 20,
    artist_name: 'Северный Шум',
    artist_image: 'https://zvuchno-dev.duckdns.org/media/photos_merch/merch-10_iEo8rxV.png',
    images: [
      {
        id: 370,
        image: 'https://zvuchno-dev.duckdns.org/media/photos_merch/merch-10_iEo8rxV.png',
        is_main: true,
      },
      {
        id: 371,
        image: 'https://zvuchno-dev.duckdns.org/media/photos_merch/merch-370.png',
        is_main: false,
      },
    ],
    variants: [
      {
        variant_id: 1413,
        sku: 'MER-370-V1413',
        stock: 5,
        property_value: 'Black'
      },
      {
        variant_id: 1414,
        sku: 'MER-370-V1414',
        stock: 5,
        property_value: 'crimson'
      },
      {
        variant_id: 1415,
        sku: 'MER-370-V1415',
        stock: 5,
        property_value: 'Lime'
      },
      {
        variant_id: 1416,
        sku: 'MER-370-V1415',
        stock: 6,
        property_value: 'ForestGreen'
      },
    ]
  }

  

  // const music = {
  //   id: 370,
  //   artist_name: 'Лунный подвал',
  //   is_single: false,
  //   variants: [
  //     {
  //       variant_id: 89,
  //       sku: 'ALB-5-V89',
  //       stock: 36,
  //       property_value: 'Диджитал', // 'Диджитал', 'Кассета', 'Диск', 'Винил'
  //       name: 'Тени в проходной',
  //       description: '[fixture:test_server_content:album:lunny-podval:2] Лунный Подвал / Тени в проходной / test import fixture',
  //       price: 199.00,
  //       allow_overpay: false,
  //       images: [
  //         {
  //           id: 11,
  //           image: 'https://zvuchno-dev.duckdns.org/media/photos_merch/merch-370.png',
  //           is_main: true,
  //         },
  //       ]
  //     },
  //     {
  //       variant_id: 151,
  //       sku: 'ALB-5-V151',
  //       stock: null,
  //       property_value: 'CD', // 'Диджитал', 'Кассета', 'Диск', 'Винил'
  //       name: 'Лунный Подвал Album 2 CD',
  //       description: '[fixture:test_server_content:merch:lunny-podval:cd:14] Fixture CD второго альбома Лунный Подвал.',
  //       price: 199.00,
  //       allow_overpay: false,
  //       images: [
  //         {
  //           id: 13,
  //           image: 'https://zvuchno-dev.duckdns.org/media/album_covers/lunny-podval-%D1%82%D0%B5%D0%BD%D0%B8-%D0%B2-%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9_gHMJvtO.png',
  //           is_main: true,
  //         },
  //         {
  //           id: 14,
  //           image: 'https://zvuchno-dev.duckdns.org/media/artists/covers/bely-podezd-artist.png',
  //           is_main: false,
  //         },
  //       ]
  //     },
  //     {
  //       variant_id: 152,
  //       sku: 'ALB-5-V152',
  //       stock: 36,
  //       property_value: 'Кассета', // 'Диджитал', 'Кассета', 'Диск', 'Винил'
  //       name: 'Лунный Подвал Album 2 Cassette',
  //       description: '[fixture:test_server_content:merch:lunny-podval:cd:14] Fixture CD второго альбома Лунный Подвал.',
  //       price: 790.00,
  //       allow_overpay: false,
  //       images: [
  //         {
  //           id: 13,
  //           image: 'https://zvuchno-dev.duckdns.org/media/artists/covers/volzhskiy-kontur-artist.png',
  //           is_main: true,
  //         },
  //         {
  //           id: 14,
  //           image: 'https://zvuchno-dev.duckdns.org/media/artists/covers/glinyany-sint-artist.png',
  //           is_main: false,
  //         },
  //       ]
  //     },
  //     {
  //       variant_id: 153,
  //       sku: 'ALB-5-V153',
  //       stock: 36,
  //       property_value: 'Винил LP', // 'Диджитал', 'Кассета', 'Диск', 'Винил'
  //       name: 'Лунный Подвал Album 2 Vinyl',
  //       description: '[fixture:test_server_content:merch:lunny-podval:vinyl:16] Fixture винил второго альбома Лунный Подвал.',
  //       price: 2490.00,
  //       allow_overpay: false,
  //       images: [
  //         {
  //           id: 13,
  //           image: 'https://zvuchno-dev.duckdns.org/media/artists/covers/gornaya-pauza-artist.png',
  //           is_main: true,
  //         },
  //         {
  //           id: 14,
  //           image: 'https://zvuchno-dev.duckdns.org/media/artists/covers/gulkiy-pereulok-artist.png',
  //           is_main: false,
  //         },
  //       ]
  //     },
  //   ]
  // }
  return (
    <>
      {/* <ArtistPageContent /> */}
      {/* <p>Страница товара {id}</p> */}
      <MerchPageContent id={id} merch={merch}/>
      {/* <ReleasePageContent id={id} release={music}/> */}
    </>
  )
};

export default DetailPage;