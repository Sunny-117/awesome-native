Mock.mock('/menu', {
    'data|18': [{
        'titles|2-4': [{
            name: '@cword(2,4)',
            href: '@url("http")'
        }],
        'content': {
            'tabs|2-5': [{
                name: '@cword(2,4)',
                href: '@url("http")'
            }],
            'subs|6-13': [{
                category: '@cword(2,4)',
                href: '#',
                'items|8-20': [{
                    name: '@cword(2,4)',
                    href: '@url("http")'
                }]
            }]
        }
    }]
})

Mock.mock('/hotwords', {
    'result|8-15':[{
        word: '@cword(2,5)',
        href: '@url(http)'
    }] 
});
Mock.mock('/recommendWords', {
    text: '@cword(2,5)'
});

Mock.mock('/navitems', {
    'result|10': [{
        name: "@cword(2,4)",
        link: '@url(http)'
    }]
})