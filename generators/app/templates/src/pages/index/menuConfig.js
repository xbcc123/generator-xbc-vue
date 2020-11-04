export let menu = [
	{
		id: "100",
		menuName: "文件管理",
		menuUrl: null,
		parentId: "000",
		auth: "proprietary-systems",
		showTF: true,
		childs: [
			{
				id: "101",
				menuName: "我的作品",
				menuUrl: "/index/explorer",
				parentId: "100",
				childs: [
					{
						id: "1111",
						menuName: "全部文件",
						menuUrl: "/index/myExplorer",
						parentId: "101",
						childs: [],
						auth: "proprietary-systems",
						showTF: true
					}
				],
				auth: "proprietary-systems",
				showTF: true
			},
			{
				id: "105",
				menuName: "全部文件1",
				menuUrl: "/index/myExplorer",
				parentId: "100",
				childs: [],
				auth: "proprietary-systems",
				showTF: true
			},
			{
				id: "106",
				menuName: "我的作品2",
				menuUrl: "/index/explorer",
				parentId: "100",
				childs: [
					{
						id: "1111",
						menuName: "全部文件",
						menuUrl: "/index/myExplorer",
						parentId: "101",
						childs: [],
						auth: "proprietary-systems",
						showTF: true
					}
				],
				auth: "proprietary-systems",
				showTF: true
			}
		]
	},
	{
		id: "1700",
		menuName: "自营系统",
		menuUrl: null,
		parentId: "000",
		showTF: false,
		auth: "proprietary-systems",
		childs: []
	}
]
