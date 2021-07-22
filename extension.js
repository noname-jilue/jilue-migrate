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
                skills(refNode) {
                    var targetCharacters = Object.keys(lib.character).filter(c => c.startsWith('jlsg'));
                    // TODO: sort by in-game order
                    var targets = new Set()
                    for (c of targetCharacters) {
                        var skills = lib.character[c][3]
                        var obj = {};
                        var addSkill = function (skill) {
                            var info = get.translation(skill + '_info')
                            if (skill in obj || !info) {
                                return;
                            }
                            // TODO: make skill prefix, card name, skill name changes
                            var repalceInfo = {
                                '锁定技，': '锁定技',
                                '主公技，': '主公技',
                                '限定技，': '限定技',
                                '觉醒技，': '觉醒技',
                            }
                            var skillDef = {
                                name: get.translation(skill),
                                intro: get.translation(skill + '_info'),
                            }
                        }
                        for (var skill of skills) {
                            addSkill(skill);
                            if (lib.skill[skill].derivation) {
                                [lib.skill[skill].derivation].flat().forEach(s => addSkill(s));
                            }
                        }
                    }
                    var ans = `export const skill = <SkillCollection>`;
                    ans += JSON.stringify(obj)
                    navigator.clipboard.writeText(ans).then(()=> console.log('success'))
                },
                cards(refNode) {

                },
                pile(refNode) {

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
            intro: `This extension aims to export jilue to a v2-friendly format. note that this might be subject to breaking changes given the early state of noname-v2.<br><br>
<span style="cursor: pointer;text-decoration: underline;font-weight: bold;" onclick="jlsg_export.characters(this)">export characters</span><br>
<span style="cursor: pointer;text-decoration: underline;font-weight: bold;" onclick="jlsg_export.skills(this)">export skills</span><br>
<span style="cursor: pointer;text-decoration: underline;font-weight: bold;" onclick="jlsg_export.cards(this)">export cards</span><br>
<span style="cursor: pointer;text-decoration: underline;font-weight: bold;" onclick="jlsg_export.pile(this)">export pile</span><br>
`,
            author: "xiaoas",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": [], "card": [], "skill": [] }
    }
})