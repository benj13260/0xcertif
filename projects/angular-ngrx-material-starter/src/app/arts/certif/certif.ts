import { Description } from '@ethersproject/properties';

export interface Attributes {
  trait_type: string;
  value: string;
}

export interface Nft {
  image?: string;
  attributes?: Attributes[];
}

export interface Certif {
  id: string;
  volumeInfo: {
    nft?: Nft;
    title?: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishDate?: string;
    description?: string;
    height?: number;
    width?: number;
    deep?: number;
    imageLinks?: {
      thumbnail?: string;
      full: string;
    };
  };
}

export interface Gallery {
  id: string;
  volumeInfo: {
    contractAddr?: string;
    title?: string;
    owner?: string;
    style?: string;
    description?: {
      title?: string;
      detail?: string[];
    };
    image?: {
      perso?: string;
      cover?: String;
    };
  };
}

export interface Galleries {
  galleries: Gallery[];
}

export function generateMockCertif(): Certif {
  return {
    id: '1',
    volumeInfo: {
      title: 'title',
      subtitle: 'subtitle',
      authors: ['author'],
      publisher: 'publisher',
      publishDate: '',
      description: 'description',
      height: 0,
      width: 0,
      deep: 0,
      imageLinks: {
        thumbnail: 'string',
        full: 'string'
      }
    }
  };
}

export function nftToCertif(id: string, nft: Nft): Certif {
  return {
    id: id,
    volumeInfo: {
      nft: nft,
      imageLinks: {
        full: nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
      }
    }
  };
}

export function galleriesMock(): Galleries {
  return {
    galleries: [
      {
        id: '1',
        volumeInfo: {
          contractAddr: '123',
          title: 'Kolly Gallery',
          owner: 'Julien Kolly',
          style: 'Graffiti',
          description: {
            title: 'OVER 15 YEARS OF EXPERIENCE',
            detail: [
              'Since 2006 the Kolly Gallery has been promoting artists who started their artistic pursuit as graffiti writers and eventually developed their art, concept and style towards contemporary art. The gallery aims to represent the universe of international graffiti art, stretching from some of the historical pioneers to the contemporary emerging protagonists of this unique art movement.',
              'Since its beginnings the Kolly Gallery has held over 200 exhibitions in Zurich, Basel, Geneva Lausanne, Paris, New York and Phnom Penh, among other places. Starting in 2006 and previously known as GT29, and later La Grille, the gallery has acquired international recognition in the graffiti art scene. The Kolly Gallery has been based in Zurich in the picturesque Seefeld area since 2014. In July 2020 the Kolly Gallery opened a second location in Geneva located in the Quartier des Bains. Behind the scenes, there is a team of experts in curating, art history, communication, graphic design and photography.',
              'The gallery is connected to the best graffiti artists in the world and strives to exhibit their unique art pieces in Zurich, Geneva and abroad. The Kolly Gallery expresses its deep gratitude and appreciation to the artists, collectors and the artistic community who share the vision and the experience behind it all!'
            ]
          },
          image: {
            perso:
              'https://media-exp1.licdn.com/dms/image/C4D03AQEGf7uSoAl-Gw/profile-displayphoto-shrink_200_200/0/1622298415402?e=1639612800&v=beta&t=XLp_41sYpTYpKZNCACDE-B4fY2Dx7xQnK7nXiqP54FQ',
            cover:
              'https://www.kollygallery.ch/wp-content/uploads/2019/02/Kolly-gallery_header.jpg'
          }
        }
      },
      {
        id: '2',
        volumeInfo: {
          contractAddr: '123',
          title: 'Kolly Gallery',
          owner: 'Julien Kolly',
          style: 'Graffiti',
          description: {
            title: 'OVER 15 YEARS OF EXPERIENCE',
            detail: [
              'Since 2006 the Kolly Gallery has been promoting artists who started their artistic pursuit as graffiti writers and eventually developed their art, concept and style towards contemporary art. The gallery aims to represent the universe of international graffiti art, stretching from some of the historical pioneers to the contemporary emerging protagonists of this unique art movement.',
              'Since its beginnings the Kolly Gallery has held over 200 exhibitions in Zurich, Basel, Geneva Lausanne, Paris, New York and Phnom Penh, among other places. Starting in 2006 and previously known as GT29, and later La Grille, the gallery has acquired international recognition in the graffiti art scene. The Kolly Gallery has been based in Zurich in the picturesque Seefeld area since 2014. In July 2020 the Kolly Gallery opened a second location in Geneva located in the Quartier des Bains. Behind the scenes, there is a team of experts in curating, art history, communication, graphic design and photography.',
              'The gallery is connected to the best graffiti artists in the world and strives to exhibit their unique art pieces in Zurich, Geneva and abroad. The Kolly Gallery expresses its deep gratitude and appreciation to the artists, collectors and the artistic community who share the vision and the experience behind it all!'
            ]
          },
          image: {
            perso:
              'https://media-exp1.licdn.com/dms/image/C4D03AQEGf7uSoAl-Gw/profile-displayphoto-shrink_200_200/0/1622298415402?e=1639612800&v=beta&t=XLp_41sYpTYpKZNCACDE-B4fY2Dx7xQnK7nXiqP54FQ',
            cover:
              'https://www.kollygallery.ch/wp-content/uploads/2019/02/Kolly-gallery_header.jpg'
          }
        }
      },
      {
        id: '3',
        volumeInfo: {
          contractAddr: '123',
          title: 'Kolly Gallery',
          owner: 'Julien Kolly',
          style: 'Graffiti',
          description: {
            title: 'OVER 15 YEARS OF EXPERIENCE',
            detail: [
              'Since 2006 the Kolly Gallery has been promoting artists who started their artistic pursuit as graffiti writers and eventually developed their art, concept and style towards contemporary art. The gallery aims to represent the universe of international graffiti art, stretching from some of the historical pioneers to the contemporary emerging protagonists of this unique art movement.',
              'Since its beginnings the Kolly Gallery has held over 200 exhibitions in Zurich, Basel, Geneva Lausanne, Paris, New York and Phnom Penh, among other places. Starting in 2006 and previously known as GT29, and later La Grille, the gallery has acquired international recognition in the graffiti art scene. The Kolly Gallery has been based in Zurich in the picturesque Seefeld area since 2014. In July 2020 the Kolly Gallery opened a second location in Geneva located in the Quartier des Bains. Behind the scenes, there is a team of experts in curating, art history, communication, graphic design and photography.',
              'The gallery is connected to the best graffiti artists in the world and strives to exhibit their unique art pieces in Zurich, Geneva and abroad. The Kolly Gallery expresses its deep gratitude and appreciation to the artists, collectors and the artistic community who share the vision and the experience behind it all!'
            ]
          },
          image: {
            perso:
              'https://media-exp1.licdn.com/dms/image/C4D03AQEGf7uSoAl-Gw/profile-displayphoto-shrink_200_200/0/1622298415402?e=1639612800&v=beta&t=XLp_41sYpTYpKZNCACDE-B4fY2Dx7xQnK7nXiqP54FQ',
            cover:
              'https://www.kollygallery.ch/wp-content/uploads/2019/02/Kolly-gallery_header.jpg'
          }
        }
      }
    ]
  };
}
