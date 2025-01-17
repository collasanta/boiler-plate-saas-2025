export const initialContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: "center",
        level: 1,
      },
      content: [
        {
          type: "emoji",
          attrs: {
            name: "muscle",
          },
        },
        {
          type: "text",
          text: ' Começe clicando aqui, e digit "/" (barra) para ver os comandos diponíveis',
        },
      ],
    },
  ],
};

// export const initialContent = {
//   type: 'doc',
//   content: [
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'center',
//         level: 1,
//       },
//       content: [
//         {
//           type: 'emoji',
//           attrs: {
//             name: 'muscle',
//           },
//         },
//         {
//           type: 'text',
//           text: ' Plano de Treino ABC 4x por Semana',
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       attrs: {
//         class: null,
//         textAlign: 'center',
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Bem-vindo ao seu novo plano de treino! Este programa é projetado para ser realizado 4 vezes por semana, seguindo uma estrutura ABC.',
//         },
//       ],
//     },
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 2,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Estrutura do Treino',
//         },
//       ],
//     },
//     {
//       type: 'bulletList',
//       content: [
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: 'Segunda-feira: Treino A',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: 'Terça-feira: Treino B',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: 'Quarta-feira: Descanso',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: 'Quinta-feira: Treino C',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: 'Sexta-feira: Treino A',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: 'Sábado e Domingo: Descanso',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 2,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Detalhes dos Treinos',
//         },
//       ],
//     },
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 3,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Treino A: Peito, Tríceps e Ombros',
//         },
//       ],
//     },
//     {
//       type: 'bulletList',
//       content: [
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Supino reto (3 séries de 8-10 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Tríceps corda (3 séries de 10-12 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Desenvolvimento de ombros (3 séries de 8-10 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 3,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Treino B: Costas e Bíceps',
//         },
//       ],
//     },
//     {
//       type: 'bulletList',
//       content: [
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Puxada na frente (3 séries de 10-12 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Rosca direta com barra (3 séries de 10-12 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Remada curvada (3 séries de 8-10 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 3,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Treino C: Pernas e Abdômen',
//         },
//       ],
//     },
//     {
//       type: 'bulletList',
//       content: [
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Agachamento (3 séries de 8-10 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Leg press (3 séries de 10-12 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Abdominal crunch (3 séries de 15-20 repetições)',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       attrs: {
//         class: null,
//         textAlign: 'left',
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Lembre-se de sempre fazer um aquecimento adequado antes de cada treino e de manter uma boa hidratação. Ajuste as cargas conforme necessário e consulte um profissional de educação física se tiver dúvidas ou preocupações.',
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       attrs: {
//         class: null,
//         textAlign: 'left',
//       },
//       content: [
//         {
//           type: 'text',
//           marks: [
//             {
//               type: 'bold',
//             },
//           ],
//           text: 'Bom treino!',
//         }
//       ],
//     },
//   ],
// }
