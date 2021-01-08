const config = {
  dbName: 'dbBlog',
  ver: 1,
  objectStores: [ // 建库依据
    {
      objectStoreName: 'group',
      index: []
    },
    {
      objectStoreName: 'blog',
      index: [ // 索引 ， unique 是否可以重复
        { name: 'groupId', unique: false }
      ]
    },
    {
      objectStoreName: 'discuess',
      index: [
        { name: 'blogId', unique: false }
      ]
    }
  ],
  objects: { // 初始化数据
    group: [
      {
        id: 1,
        value: 1,
        label: 'Vue',
        introduction: 'Vue'
      },
      {
        id: 2,
        value: 2,
        label: 'React',
        introduction: 'React'
      },
      {
        id: 3,
        value: 3,
        label: 'Angular',
        introduction: 'Angular'
      },
      {
        id: 4,
        value: 4,
        label: 'Node',
        introduction: 'Node'
      }
    ],
    blog: [
      {
        id: 0,
        groupId: 1,
        title: '这是一个博客',
        addTime: '2020-10-15',
        introduction: '这是博客简介',
        concent: '这是博客的详细内容<br>第二行',
        viewCount: 1,
        agreeCount: 1
      }
    ],
    discuess: [
      {
        id: 1,
        blogId: 1,
        nick: 'jyk',
        addTime: '2020-12-16',
        concent: '讨论一下',
        agreeCount: 0
      }
    ]
  }
}

export { config }
