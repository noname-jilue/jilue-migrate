game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "极略导出",
        content: function (config, pack) {
            window.jlsg_export = {
                extName: '极略',
                characters(refNode) {
                    var targets = Object.keys(lib.character).filter(c => c.startsWith('jlsg'));
                    var obj = {};
                    for (var c of targets) {
                        var cProfile = lib.character[c]
                        var cDef = {
                            name: get.translation(c),
                            intro: get.characterIntro(c),
                            gender: cProfile[0],
                            faction: cProfile[1],
                            hp: cProfile[2],
                            skills: cProfile[3],
                        }
                        if (cDef.intro == '暂无武将介绍') {
                            delete cDef.intro;
                        }
                        obj[c] = cDef;
                    }
                    var ans = `export const hero = <HeroCollection>`;
                    ans += JSON.stringify(obj)
                    navigator.clipboard.writeText(ans).then(()=> console.log('success'))
                },
            }
        },
        precontent: function () {
        },
        help: {}, config: {}, package: {
            character: {
                character: {
                },
                translate: {
                },
            },
            card: {
                card: {
                },
                translate: {
                },
                list: [],
            },
            skill: {
                skill: {
                },
                translate: {
                },
            },
            intro: `This extension aims to export jilue to a v2-friendly format. note that this might be subject to breaking changes given the early state of noname-v2.<br>
<span onclick="if(jlsg_export)jlsg_export.characters(this)">export characters</span><br>
<span>export skills</span><br>
<span>export cards</span><br>
<span>export pile</span><br>
`,
            author: "xiaoas",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": [], "card": [], "skill": [] }
    }
})