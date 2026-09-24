// assets/js/products-db.js
const PRODUCTS_DB = [
    {
        id: 'cam-01',
                category: 'cameras',
                name: 'CAMERA PTZ ICSEE LENTE DUPLA 315°',
                price: 160.00,
                isHighlight: true,
                description: 'Câmera inteligente com lente dupla para rastreamento simultâneo, rotação 315°, visão noturna infravermelho e conexão via iCSee.',
                image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcREwmjkVurC-kZ5UGqmmmVtMmV-TEXVZl57DPrZ8hrrXSMLc0jZyUU0w2w4oSytJqGBmAicR245BqD8aoszKbFSpl4G1ueWI782leLIiAkcXzz-fXhCLQQrIh0&usqp=CAc',
                fallbackImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'cam-02',
                category: 'cameras',
                name: 'CAMERA SPEED DOME ICSEE LENTE DUPLA SENSOR',
                price: 290.00,
                isHighlight: false,
                description: 'Câmera IP externa Speed Dome com sensor avançado de movimento, lentes duplas para maior campo de visão e rotação PTZ.',
                image: 'https://images.tcdn.com.br/img/img_prod/577903/camera_externa_speed_dome_ip_wi_fi_com_2_lentes_1080p_340o_90o_pan_tilt_3_6mm_sky_2_jl_protec_949_1_48fa17fb1109495df8fdb0e3012b2138.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'cam-03',
                category: 'cameras',
                name: 'CAMERA PTZ DUPLA C/PLACA SOLAR',
                price: 450.00,
                isHighlight: false,
                description: 'Câmera externa com autonomia solar completa, painel solar integrado, bateria recarregável e tecnologia dual lens via app iCSee.',
                image: 'https://images.tcdn.com.br/img/img_prod/1408869/cmera_solar_4g_lte_icsee_dual_lens_2mp_externa_com_1_20260611140436_cfd0f2cdd9e1.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop&q=80'
            },

            // HARDWARE & PROCESSADORES
            {
                id: 'proc-01',
                category: 'hardware',
                name: 'Processador AMD Athlon 3000G, 2-Core, 4-Threads, 3.5GHz, AM4',
                price: 299.99,
                isHighlight: false,
                description: 'Processador de entrada com vídeo integrado Radeon Vega 3, excelente para tarefas do dia a dia, escritórios e home office.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8l48c-nRf73t1GvZLrrnIgRpYEwJqOXC1xUB3PhCDg&s=10',
                fallbackImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'proc-02',
                category: 'hardware',
                name: 'Processador AMD Ryzen 3 3200G, 4-Core, 3.6GHz (4GHz Turbo)',
                price: 439.99,
                isHighlight: false,
                description: 'Gráficos integrados Radeon Vega 8, ideal para rodar jogos leves e multitarefas sem necessidade de placa de vídeo dedicada.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4pNGcntaANOeC4Nasgb4GxmM7UogJCPTG2Gd4k3Z96A&s=10',
                fallbackImage: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'proc-04',
                category: 'hardware',
                name: 'Processador AMD Ryzen 5 5500, 6-Core, 12-Threads, 3.6GHz',
                price: 539.99,
                isHighlight: true,
                description: 'Desempenho de alta escala para jogos e renderização na plataforma AM4 com 12 threads e arquitetura Zen 3.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxv0OQFuWfyGBDRAgJFgX374mGLbn1R7WR31ub2IhLGA&s=10',
                fallbackImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'gpu-03',
                category: 'hardware',
                name: 'Placa de Vídeo Mancer Radeon RX 6600 Streaky V2, 8GB GDDR6',
                price: 1599.99,
                isHighlight: true,
                description: 'A queridinha do Full HD Ultra. 8GB de VRAM GDDR6 para encarar jogos pesados com altíssima taxa de quadros e fluidez.',
                image: 'https://hotsite.pichau.com.br/descricao/mancer/MCR-RX6600LE-STKV2/MCR-RX6600LE-STK8.png',
                fallbackImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'gpu-04',
                category: 'hardware',
                name: 'Placa de Vídeo XFX Swift Radeon RX 9070 GRE Triple Fan, 12GB',
                price: 4189.99,
                isHighlight: false,
                description: 'Alta performance para rodar jogos em Quad HD (1440p) e 4K com refrigeração Triple Fan e dissipador de alumínio reforçado.',
                image: 'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/r/x/rx-97gre29w71.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'ram-03',
                category: 'hardware',
                name: 'Memória Adata XPG Spectrix D35G, RGB, 8GB (1x8GB), DDR4, 3200MHz',
                price: 599.99,
                isHighlight: false,
                description: 'Design dissipador em liga metálica com iluminação RGB sincronizável e alto desempenho para estabilidade em jogos.',
                image: 'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/a/x/ax4u32008g16a-swhd35g1.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'ssd-03',
                category: 'hardware',
                name: 'SSD Kingston NV3, 1TB, M.2 2280 NVMe (Leitura 6000MB/s)',
                price: 1154.99,
                isHighlight: false,
                description: '1 Terabyte de espaço ultrarrápido para carregamento instantâneo do sistema operacional, jogos e programas pesados.',
                image: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/645680/xlarge/SSD-Kingston-1TB-Nv3-M-2-Nvme-PCIe-4-Leitura-6000MB-s-Grava-o-4000MB-s-Snv3s-1000g_1748375089.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80'
            },

            // ACESSÓRIOS PARA GABINETE & MODDING
            {
                id: 'acess-01',
                category: 'acessorios',
                name: 'Suporte Para Gabinete Pichau MXT White, Com Rodas',
                price: 32.99,
                isHighlight: false,
                description: 'Largura ajustável de 19,5 a 29cm, feito em ABS de alta resistência com rodízios de 40mm e trava de segurança.',
                image: 'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/p/c/pch-mxtwb-wb0116v545.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80'
            },
            {
                id: 'acess-02',
                category: 'acessorios',
                name: 'Tela Secundária Pichau Aqua Core, 480x480, Preto',
                price: 176.46,
                isHighlight: false,
                description: 'Monitoramento em tempo real de temperaturas e métricas do processador/placa de vídeo diretamente no interior do gabinete.',
                image: 'https://http2.mlstatic.com/D_NQ_NP_913655-MLA99469976368_112025-O.webp',
                fallbackImage: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80'
            },
            {
                id: 'acess-03',
                category: 'acessorios',
                name: 'Suporte Para Placa de Vídeo Cooler Master Atlas, ARGB',
                price: 235.28,
                isHighlight: false,
                description: 'Estrutura robusta em vidro temperado com iluminação ARGB sincronizável para evitar o envergamento da GPU.',
                image: 'https://media.pichau.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/m/c/mca-u000r-agsbtg-002.jpg',
                fallbackImage: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80'
            },

            // PERIFÉRICOS
            {
                id: 'tec-01',
                category: 'perifericos',
                name: 'Stream Deck Neo Elgato, 8 Teclas, Branco (10GBJ9901)',
                price: 529.99,
                isHighlight: false,
                description: 'Mesa de atalhos e automação para criadores de conteúdo e streamers, com 8 teclas personalizáveis com visor dinâmico.',
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'tec-03',
                category: 'perifericos',
                name: 'Teclado Gamer Redragon Shiva 87, RGB, Membrana, TKL ABNT2, USB',
                price: 119.99,
                isHighlight: false,
                description: 'Teclado compacto formato TKL com padrão ABNT2, teclas silenciosas de acionamento macio e suporte a macros programáveis.',
                image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'mou-01',
                category: 'perifericos',
                name: 'Mouse Gamer Marvo Duke 20, RGB, 6400DPI, 7 Botões, Wireless, Branco',
                price: 59.99,
                isHighlight: false,
                description: 'Mouse ergonômico sem fio com bateria de longa duração, sensor óptico de alta precisão até 6400 DPI e RGB customizável.',
                image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'head-01',
                category: 'perifericos',
                name: 'Headset Gamer K-Mex AR77, RGB, 7.1 Surround, USB, Preto',
                price: 49.99,
                isHighlight: false,
                description: 'Imersão sonora total com simulador 7.1 Surround, almofadas auriculares macias e microfone flexível com redução de ruído.',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'mic-04',
                category: 'perifericos',
                name: 'Microfone Dinâmico Gamer Redragon Solara, RGB + Braço Articulado',
                price: 429.99,
                isHighlight: false,
                description: 'Kit de gravação profissional para podcast e live stream. Acompanha microfone dinâmico com pop filter, shock mount e braço articulado.',
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
            },

            // MONITORES
            {
                id: 'mon-01',
                category: 'monitores',
                name: 'Monitor Gamer 24" Full HD 165Hz 1ms IPS',
                price: 820.00,
                isHighlight: false,
                description: 'Painel IPS de cores vivas com taxa de atualização de 165Hz e tempo de resposta de 1ms, sem rastro de imagem (ghosting).',
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
            },

            // SERVIÇOS
            {
                id: 'serv-01',
                category: 'servicos',
                name: 'Formatação Completa + Limpeza Física de Computador/Notebook',
                price: 100.00,
                isHighlight: false,
                description: 'Instalação limpa do Windows 10/11, drivers atualizados, pacote Office, antivírus, despoeiramento interno e troca de pasta térmica.',
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80'
            },
            {
                id: 'serv-02',
                category: 'servicos',
                name: 'Montagem de PC Gamer / Desktop Profissional',
                price: 120.00,
                isHighlight: false,
                description: 'Montagem de peças do zero, organização profissional de cabos (Cable Management), atualização de BIOS, testes de temperatura e estabilidade.',
                image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=80',
                fallbackImage: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=80'
            }
        
];