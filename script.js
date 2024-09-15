// Constants
const masteries_max = 10;
const lucky_hit_max = 6;
const javelin_max = 10;
const MAX_SKILLPOINTS = 101;

// DOM Elements
const abilityGrid = document.getElementById("ability-grid");
const talentGrid = document.getElementById("talent-grid");
const talentContainer = document.getElementById("talent-container");
const levelInput = document.getElementById("level");
const requiredLevelDisplay = document.getElementById("required-level");
const descriptionText = document.getElementById("description-text");
const abilitiesTab = document.getElementById("abilities-tab");
const talentsTab = document.getElementById("talents-tab");

// State
let activeTab = "abilities";
let pointsSpent = 0;
let masteries_current = 0;
let lucky_hit_current = 0;
let javelin_current = 0;
let ctrl_mod = false;

// Updated data structure
const abilities = [
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Nova",
        icon: "nova.png",
        description: `Deal a percentage of your ability power in a radius around yourself. Nova's damage decreases the further away the target is hit in its radius.`,
        level: 0
      },
      {
        name: "Frost Nova",
        icon: "nova_speed.png",
        description: `Changes Nova to freeze mobs around you in a radius. The mobs will stay frozen for a duration of time, and then get Hypothermia, causing them to be permanently chilled and take damage every 3 seconds'.`,
        level: 0
      },
      {
        name: "Poison Nova",
        icon: "nova_dot.png",
        description: `Changes Nova to instead inflict a percentage of your ability power through poison. The damage will be dealt over a period of time.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 4,
    cost: 1,
    options: [
      {
        name: "Vein Miner",
        icon: "vein_miner.png",
        description: `Allows you to mine multiple blocks at once!`,
        level: 0
      },
      {
        name: "Finesse Miner",
        icon: "vein_miner_durability.png",
        description: `Changes Vein Miner to gain a chance of ignoring taking durability damage while using it to mine blocks. However, the amount of blocks mined is lowered.`,
        level: 0
      },
      {
        name: "Void Miner",
        icon: "vein_miner_void.png",
        description: `Changes Vein Miner to void any blocks it mines inside a vault with the exception of vault ores. However the amount of blocks mined is lowered.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 2,
    options: [
      {
        name: "Rampage",
        icon: "rampage.png",
        description: `Puts you in a state of rampage, giving you an additional physical damage increase while active.`,
        level: 0
      },
      {
        name: "Vampiric",
        icon: "rampage_leech.png",
        description: `Changes rampage to give you life leech instead of increasing your damage while rampaging.`,
        level: 0
      },
      {
        name: "Chaining",
        icon: "rampage_chain.png",
        description: `Changes rampage to give your attacks a chaining effect, hitting multiple mobs beyond the first, instead of increasing your damage while rampaging.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 2,
    cost: 2,
    options: [
      {
        name: "Ghost Walk",
        icon: "ghost_walk.png",
        description: `Makes you invisible for a duration of time. Attacking anything during the Ghost Walk will cancel its effect.`,
        level: 0
      },
      {
        name: "Spirit Walk",
        icon: "ghost_walk_spirit_walk.png",
        description: `Makes you invisible for a duration of time. Attacking anything, breaking a block, or opening a container during the Spirit Walk will cancel its effect.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Dash",
        icon: "dash.png",
        description: `Propels you a distance in the direction you are facing!`,
        level: 0
      },
      {
        name: "Bullet",
        icon: "dash_damage.png",
        description: `Turns your dashes into bullets, making you deal a percentage of your physical damage to any mob you hit with your dash.`,
        level: 0
      },
      {
        name: "Warp",
        icon: "dash_warp.png",
        description: `Shoot a magic arrow that teleports you to its location on impact. If you hit a mob or another player you swap places with them.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 5,
    cost: 1,
    options: [
      {
        name: "Mega Jump",
        icon: "mega_jump.png",
        description: `Gives you the ability to mega jump up in the air.`,
        level: 0
      },
      {
        name: "Mega Dig",
        icon: "mega_jump_break_down.png",
        description: `Changes Mega Jump to a Mega Dig! Instead of launching you up in the air it drills you downwards in to blocks, breaking them on the way.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Shell",
        icon: "shell.png",
        description: `While active, Shell will give you hardened skin, giving you a  chance to stun mobs when getting hit.`,
        level: 0
      },
      {
        name: "Porcupine",
        icon: "shell_porcupine.png",
        description: `While active, Porcupine will increase your thorns damage and give you  durability resistance.`,
        level: 0
      },
      {
        name: "Quill",
        icon: "shell_quill.png",
        description: `While active, Quill will increase your thorns damage and chain your thorns to hit additional targets. In addition Quill also gives you a durability resistance while active.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Rejuvenation Totem",
        icon: "totem.png",
        description: `Creates a totem near you that heals all players in a radius per second.`,
        level: 0
      },
      {
        name: "Wrath Totem",
        icon: "totem_player_damage.png",
        description: `Creates a totem near you that increases physical damage of all players in a radius.`,
        level: 0
      },
      {
        name: "Spirit Totem",
        icon: "totem_mana_regen.png",
        description: `Creates a totem near you that regenerates mana of all players in a radius per second.`,
        level: 0
      },
      {
        name: "Hatred Totem",
        icon: "totem_mob_damage.png",
        description: `Creates a totem near you that does a minimal percentage of your ability power to all mobs in a radius on a delay. These hits applies any on-hit effects you may have, with the exception of Lucky Hit.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Heal",
        icon: "heal.png",
        description: `Heals you for an amount of hitpoints.`,
        level: 0
      },
      {
        name: "Group Heal",
        icon: "heal_group.png",
        description: `Changes your Heal to a group heal! Healing yourself and teammates around you for an amount of hitpoints.`,
        level: 0
      },
      {
        name: "Cleanse",
        icon: "heal_effect.png",
        description: `Changes Heal to instead Cleanse any negative effect affecting you.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Empower",
        icon: "empower.png",
        description: `Gives you an aura of movement speed. Affecting you and other players within range  while active.`,
        level: 0
      },
      {
        name: "Ice Armor",
        icon: "empower_ice_armour.png",
        description: `Encase yourself in a barrier of frost, chilling any mob that hits you for a duration of time while active.`,
        level: 0
      },
      {
        name: "Entropic Bind",
        icon: "empower_entropy.png",
        description: `Gives you an aura of entropy slowing down mobs in a radius around you while active.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 2,
    cost: 2,
    options: [
      {
        name: "Javelin",
        icon: "javelin.png",
        description: `Summon a magical Javelin to hit your foes afar. Deals an amount of damage based of your weapon damage and knocks mobs away on impact`,
        level: 0
      },
      {
        name: "Piercing Javelin",
        icon: "javelin_piercing.png",
        description: `Summon a magical Javelin to hit your foes afar. Deals an amount of damage based of your weapon damage and pierces an amount of mobs on impact`,
        level: 0
      },
      {
        name: "Scatter Javelin",
        icon: "javelin_scatter.png",
        description: `Summon a magical Javelin to hit your foes afar. Deals an amount of damage based of your weapon damage and scatters an amount of javelins on impact bouncing several times`,
        level: 0
      },
      {
        name: "Sight Javelin",
        icon: "javelin_sight.png",
        description: `Summon a magical Javelin to hit your foes afar. Deals an amount of damage based of your weapon damage and scans the area in a radius on impact, revealing chests and mobs`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 1,
    cost: 4,
    options: [
      {
        name: "Hunter",
        icon: "hunter.png",
        description: `Highlights all POI's in a radius for a duration of time. POI's include all chests, coins, god altars and objective points.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 2,
    options: [
      {
        name: "Smite",
        icon: "smite.png",
        description: `While active, Smite will  periodically  strike a mob within  range  dealing a percentage of your ability power, and transfering any on-hit modifiers to the target.`,
        level: 0
      },
      {
        name: "Archon",
        icon: "smite_archon.png",
        description: `While active, Smite Archon will turn you in to a spark. Making any mob you physically touch get bolted for a percentage of your ability power and gives you durability resistance. `,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Taunt",
        icon: "taunt.png",
        description: `Taunts mobs around you in a radius, angering them towards you, and making them vulnerable for a duration of time. Each level of Vulnerability increases damage taken to that mob by 10%.`,
        level: 0
      },
      {
        name: "Fear",
        icon: "taunt_repel.png",
        description: `Instead of taunting mobs around you, they are now feared by you in a radius. A feared mob will get pushed away and refuse to attack you for a duration of time.`,
        level: 0
      },
      {
        name: "Charm",
        icon: "taunt_charm.png",
        description: `Charms a number of mobs within a radius around you to fight for you. Charmed mobs deal a percentage of your ability power as damage to their targets and can trigger on-hit effects.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Stonefall",
        icon: "stonefall.png",
        description: `Reduces fall damage when landing while active knocking back mobs in a radius.`,
        level: 0
      },
      {
        name: `Hero's Landing`,
        icon: "stonefall_snow.png",
        description: `Reduces fall damage when landing while active dealing damage based off ability power to nearby mobs in a radius. The radius is increased with your fall distance.`,
        level: 0
      },
      {
        name: "Coldsnap",
        icon: "stonefall_cold.png",
        description: `Reduces fall damage when landing while active. Chilling and creating glacial prisons to mobs in a radius. The radius is affected by fall distance.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Mana Shield",
        icon: "mana_shield.png",
        description: `Gives you a shield that redirects a percentage of incoming damage to your mana pool.`,
        level: 0
      },
      {
        name: "Retribution",
        icon: "mana_shield_retribution.png",
        description: `Gives you a mana shield that redirects a percentage of incoming damage to your mana pool. After absorbing damage, your next attack's damage will be added to a percentage of the absorbed damage and dealt to all mobs in a radius around your target.`,
        level: 0
      },
      {
        name: "Implode",
        icon: "mana_shield_implode.png",
        description: `Drains all of your mana dealing damage equal to a percentage of the mana drained to all enemies in a radius.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 4,
    cost: 1,
    options: [
      {
        name: "Battle Cry",
        icon: "battle_cry.png",
        description: `Drain the essence of mobs around you, gathering Battle Cry stacks and release an amount of stacks, giving you bonus attack damage on your next direct on-hit attack. The stacks will fizzle after a duration of time if not used.`,
        level: 0
      },
      {
        name: "Spectral Cry",
        icon: "battle_cry_spectral_strike.png",
        description: `Drain the essence of mobs around you, gathering Battle Cry stacks and release an amount of stacks, adding ability power as damage, on your next direct on-hit attack. The stacks will fizzle after a duration of time if not used.`,
        level: 0
      },
      {
        name: "Lucky Cry",
        icon: "battle_cry_lucky_strike.png",
        description: `Drain the essence of mobs around you, gathering Battle Cry stacks and release an amount of stacks, giving you bonus Lucky Hit chance on your next direct on-hit attack. The stacks will fizzle after a duration of time if not used.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Storm Arrow",
        icon: "thunderstorm.png",
        description: `Shoot an arrow that creates a storm above upon impact. Deals an amount of damage based of your ability power. The storm cloud stays for a duration and will strike every so often.`,
        level: 0
      },
      {
        name: "Blizzard Arrow",
        icon: "blizzard.png",
        description: `Shoot an arrow that creates an ice storm above upon impact. Each ice shard will freeze mobs on hit for a duration. Also has a chance to frostbite the mob for a duration every so often.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 4,
    cost: 1,
    options: [
      {
        name: "Farmer",
        icon: "farmer.png",
        description: `Increases growth speed on crops in a radius using a delay. Farmer targets: Seeds, Potatoes, Carrots, Beet Root, Flax Seeds`,
        level: 0
      },
      {
        name: "Farmer: Cultivator",
        icon: "farmer_melon.png",
        description: `Increases growth speed on crops in a radius using a delay. Cultivator targets all base ability targets, plus: Melon, Pumpkins`,
        level: 0
      },
      {
        name: "Farmer: Gardener",
        icon: "farmer_cactus.png",
        description: `Increases growth speed on crops in a radius using a delay. Cultivator targets all base ability targets, plus: Cactus, Sugar Cane, Nether Wart`,
        level: 0
      },
      {
        name: "Farmer: Rancher",
        icon: "farmer_animal.png",
        description: `Changes Farmer to also incentivise baby animals to become big bois! (pog) It does so with a delay in a radius around you. Rancher targets all base ability targets, plus: Baby Animals, Baby Villagers`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Fireball",
        icon: "fireball.png",
        description: `Summon a magical Fireball to hit your foes afar. Deals an amount of damage based of your ability power.`,
        level: 0
      },
      {
        name: "Fire Volley",
        icon: "fireball_volley.png",
        description: `Summon a magical bouncing Fireball that scorches mobs in its path and deals an amount of damage based of your ability power. After a duration of time, it explodes in a radius dealing its full damage.`,
        level: 0
      },
      {
        name: "Fireshot",
        icon: "fireball_fireshot.png",
        description: `Summon a small magical fireshot to hit mobs from afar. Deals an amount of damage based of your ability power, and transfers any on-hit effects from you.`,
        level: 0
      }
    ],
    selectedOption: null
  },
  {
    maxLevel: 8,
    cost: 1,
    options: [
      {
        name: "Ice Bolt",
        icon: "ice_bolt.png",
        description: `Summon a small Ice Bolt, dealing no damage but chilling mobs hit for a duration of time.`,
        level: 0
      },
      {
        name: "Glacial Blast",
        icon: "ice_blast.png",
        description: `Summon a small Ice Bolt, dealing no damage but chilling mobs hit for a duration of time.`,
        level: 0
      }
    ],
    selectedOption: null
  }
];

const talents = [
  {
    name: "Speed",
    icon: "speed.png",
    description: `Increases your movement speed by applying the speed effect permanently. <br> Every level of the speed effect increases movement speed by 20%. <br>
1 <span style="color: green;">+1</span><br>
2 <span style="color: green;">+2</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 2,
    talentGroup: null
  },
  {
    name: "Haste",
    icon: "haste.png",
    description: `Increases your mining speed by applying the Haste effect permanently. <br> Every level of the Haste effect increases mining speed by 20%. <br>
1 <span style="color: green;">+1</span><br>
2 <span style="color: green;">+2</span><br>
3 <span style="color: green;">+3</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Strength",
    icon: "strength.png",
    description: `Increases your damage by applying the Strength effect permanently. <br> Every level of the Strength effect increases your base damage by 3. <br>
1 <span style="color: green;">+1</span><br>
2 <span style="color: green;">+2</span><br>
3 <span style="color: green;">+3</span><br>
4 <span style="color: green;">+4</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Intelligence",
    icon: "intelligence.png",
    description: `Increases your Ability Power. <br>
1 <span style="color: rgb(255, 0, 203);">+3</span><br>
2 <span style="color: rgb(255, 0, 203);">+6</span><br>
3 <span style="color: rgb(255, 0, 203);">+9</span><br>
4 <span style="color: rgb(255, 0, 203);">+12</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Nucleus",
    icon: "nucleus.png",
    description: `Killing a stunned mob has a chance of causing an explosive reaction, casting a Nova of your level around the killed mob.<br><em>This talent requires levels in the ability Nova</em> <br>
1 <span style="color: rgb(255, 235, 7);">10%</span><br>
2 <span style="color: rgb(255, 235, 7);">20%</span><br>
3 <span style="color: rgb(255, 235, 7);">30%</span><br>
4 <span style="color: rgb(255, 235, 7);">40%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Daze"
  },
  {
    name: "Daze",
    icon: "dazed.png",
    description: `Deal increased damage to a stunned mob per hit. <br>
1 <span style="color: rgb(194, 54, 39);">25%</span><br>
2 <span style="color: rgb(194, 54, 39);">50%</span><br>
3 <span style="color: rgb(194, 54, 39);">75%</span><br>
4 <span style="color: rgb(194, 54, 39);">100%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Nucleus"
  },
  {
    name: "Last Stand",
    icon: "last_stand.png",
    description: `Gain extra resistance while below 20% max health. <br>
1 <span style="color: rgb(9, 191, 184);">10%</span><br>
2 <span style="color: rgb(9, 191, 184);">20%</span><br>
3 <span style="color: rgb(9, 191, 184);">30%</span><br>
4 <span style="color: rgb(9, 191, 184);">40%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Berserking"
  },
  {
    name: "Berserking",
    icon: "berserking.png",
    description: `Gain extra damage while below 20% max health. <br>
1 <span style="color: rgb(194, 54, 39);">20%</span><br>
2 <span style="color: rgb(194, 54, 39);">40%</span><br>
3 <span style="color: rgb(194, 54, 39);">60%</span><br>
4 <span style="color: rgb(194, 54, 39);">80%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Last Stand"
  },
  {
    name: "Sorcery",
    icon: "sorcery.png",
    description: `Gain extra mana regeneration while at full health. <br>
<span style="color: rgb(3, 83, 215);">+10%</span> for each level`,
    cost: 1,
    level: 0,
    maxLevel: 8,
    talentGroup: null
  },
  {
    name: "Witchery",
    icon: "witchery.png",
    description: `Gain extra soul chance when killing mobs while being above 80% mana. <br>
1 <span style="color: rgb(72, 0, 255);">20%</span><br>
2 <span style="color: rgb(72, 0, 255);">40%</span><br>
3 <span style="color: rgb(72, 0, 255);">60%</span><br>
4 <span style="color: rgb(72, 0, 255);">80%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Frozen Impact",
    icon: "blizzard.png",
    description: `Hitting a chilled mob has a chance of causing a Frost Nova to be cast around the target. <br> <em>The Frost Nova scales in level with this talent and does not require you to have the ability learnt.</em> <br>
1 <span style="color: rgb(255, 235, 7);">10%</span> Frost Nova <span style="color: rgb(193, 87, 157);">1</span><br>
2 <span style="color: rgb(255, 235, 7);">15%</span> Frost Nova <span style="color: rgb(193, 87, 157);">2</span><br>
3 <span style="color: rgb(255, 235, 7);">20%</span> Frost Nova <span style="color: rgb(193, 87, 157);">3</span><br>
4 <span style="color: rgb(255, 235, 7);">25%</span> Frost Nova <span style="color: rgb(193, 87, 157);">4</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Frost Bite"
  },
  {
    name: "Frost Bite",
    icon: "frostbite.png",
    description: `Hitting a chilled mob has a chance of causing them to get Glacial Imprisoned for 3 seconds, and if hit again they will shatter and die instantly, regardless of their health. <br>
<span style="color: rgb(255, 235, 7);">+2,5%</span> chance for each level`,
    cost: 1,
    level: 0,
    maxLevel: 8,
    talentGroup: null,
    talentLink: "Frozen Impact"
  },
  {
    name: "Methodical",
    icon: "methodical.png",
    description: `Gain extra healing efficiency while below 20% max mana. <br>
1 <span style="color: rgb(125, 245, 135);">20%</span><br>
2 <span style="color: rgb(125, 245, 135);">40%</span><br>
3 <span style="color: rgb(125, 245, 135);">60%</span><br>
4 <span style="color: rgb(125, 245, 135);">80%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Depleted"
  },
  {
    name: "Depleted",
    icon: "depleted.png",
    description: `Gain extra damage while below 20% max mana. <br>
1 <span style="color: rgb(194, 54, 39);">20%</span><br>
2 <span style="color: rgb(194, 54, 39);">40%</span><br>
3 <span style="color: rgb(194, 54, 39);">60%</span><br>
4 <span style="color: rgb(194, 54, 39);">80%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Methodical"
  },
  {
    name: "Prudent",
    icon: "potion_amount.png",
    description: `Gives you a chance to not consume a potion charge when drinking any Vault Potion.<br>
<span style="color: rgb(255, 235, 7);">+5%</span> chance for each level`,
    cost: 1,
    level: 0,
    maxLevel: 8,
    talentGroup: null
  },
  {
    name: "Stoneskin",
    icon: "stone_skin.png",
    description: `Your skin hardens, gain extra knockback resistance while above 80% of your max health. <br>
1 <span style="color: rgb(255, 176, 15);">20%</span><br>
2 <span style="color: rgb(255, 176, 15);">40%</span><br>
3 <span style="color: rgb(255, 176, 15);">60%</span><br>
4 <span style="color: rgb(255, 176, 15);">80%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Blight",
    icon: "blight.png",
    description: `Apply Weakness to your targets while hitting them, lowering their damage for a duration of time, if they are affected by Poison. <br>
1 <span style="color: rgb(194, 54, 39);">-50%</span> - <span style="color: rgb(112, 36, 172);">2s</span><br>
2 <span style="color: rgb(194, 54, 39);">-60%</span> - <span style="color: rgb(112, 36, 172);">3s</span><br>
3 <span style="color: rgb(194, 54, 39);">-70%</span> - <span style="color: rgb(112, 36, 172);">4s</span><br>
4 <span style="color: rgb(194, 54, 39);">-80%</span> - <span style="color: rgb(112, 36, 172);">5s</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Toxic Reaction"
  },
  {
    name: "Toxic Reaction",
    icon: "toxic_reaction.png",
    description: `Killing a mob affected by Poison has a chance of casting a Poison Nova, of your level, when the mob dies. This effect can chain indefinitely, but requires you to have levels in Poison Nova. <br>
1 <span style="color: rgb(255, 235, 7);">30%</span><br>
2 <span style="color: rgb(255, 235, 7);">50%</span><br>
3 <span style="color: rgb(255, 235, 7);">70%</span><br>
4 <span style="color: rgb(255, 235, 7);">90%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null,
    talentLink: "Blight"
  },
  {
    name: "Prime Amplification",
    icon: "prime_amplification.png",
    description: `Gain increased area of effect while being above 80% health.<br>
<span style="color: rgb(233, 195, 117);">+5%</span> for each level`,
    cost: 1,
    level: 0,
    maxLevel: 8,
    talentGroup: null
  },
  {
    name: "Hunters Instinct",
    icon: "hunters_instinct.png",
    description: `Killing a mob grants a small chance of having their death cause your Hunter senses to trigger, revealing all POI's in a radius around the killed mob. <br> <em> This talent requires a level in Hunter</em>`,
    cost: 2,
    level: 0,
    maxLevel: 1,
    talentGroup: null
  },
  {
    name: "Purist",
    icon: "purist.png",
    description: `Deal extra damage based on the amount of Scrappy armor pieces you wear. <br>
1 <span style="color: rgb(194, 54, 39);">+2.5% damage per piece</span><br>
2 <span style="color: rgb(194, 54, 39);">+5% damage per piece</span><br>
3 <span style="color: rgb(194, 54, 39);">+7,5% damage per piece</span><br>
4 <span style="color: rgb(194, 54, 39);">+10% damage per piece</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Frenzy",
    icon: "frenzy.png",
    description: `Gain +2.5% Attack Speed when killing a mob. This effect can stack and lasts for a duration of time. <br>
1 <span style="color: rgb(255, 235, 7);">4 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">4 seconds</span> wear-off time<br>
2 <span style="color: rgb(255, 235, 7);">6 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">6 seconds</span> wear-off time<br>
3 <span style="color: rgb(255, 235, 7);">8 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">8 seconds</span> wear-off time<br>
4 <span style="color: rgb(255, 235, 7);">10 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">10 seconds</span> wear-off time<br>`,
    cost: 2,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Bountiful Harvest",
    icon: "bountiful_harvest.png",
    description: `Gain increased item quantity while being below 20% health. <br>
1 <span style="color: rgb(255, 170, 61);">5%</span><br>
2 <span style="color: rgb(255, 170, 61);">10%</span><br>
3 <span style="color: rgb(255, 170, 61);">15%</span><br>
4 <span style="color: rgb(255, 170, 61);">20%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Treasure Seeker",
    icon: "treasure_seeker.png",
    description: `Gain increased item rarity while being below 20% health. <br>
1 <span style="color: rgb(234, 255, 0);">5%</span><br>
2 <span style="color: rgb(234, 255, 0);">10%</span><br>
3 <span style="color: rgb(234, 255, 0);">15%</span><br>
4 <span style="color: rgb(234, 255, 0);">20%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Arcana",
    icon: "arcana.png",
    description: `Gain +20% Mana Regeneration when killing a mob. This effect can stack and lasts for a duration of time. <br>
1 <span style="color: rgb(255, 235, 7);">2 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">4 seconds</span> wear-off time<br>
2 <span style="color: rgb(255, 235, 7);">4 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">6 seconds</span> wear-off time<br>
3 <span style="color: rgb(255, 235, 7);">6 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">8 seconds</span> wear-off time<br>
4 <span style="color: rgb(255, 235, 7);">8 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">10 seconds</span> wear-off time<br>`,
    cost: 2,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Blazing",
    icon: "blazing.png",
    description: `Gain +2% Movement Speed when killing a mob. This effect can stack and lasts for a duration of time. <br>
1 <span style="color: rgb(255, 235, 7);">4 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">4 seconds</span> wear-off time<br>
2 <span style="color: rgb(255, 235, 7);">6 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">6 seconds</span> wear-off time<br>
3 <span style="color: rgb(255, 235, 7);">8 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">8 seconds</span> wear-off time<br>
4 <span style="color: rgb(255, 235, 7);">10 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">10 seconds</span> wear-off time<br>`,
    cost: 2,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Lucky Momentum",
    icon: "luck_momentum.png",
    description: `Gain +1% Lucky Hit Chance when killing a mob. This effect can stack and lasts for a duration of time. <br>
1 <span style="color: rgb(255, 235, 7);">2 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">4 seconds</span> wear-off time<br>
2 <span style="color: rgb(255, 235, 7);">4 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">6 seconds</span> wear-off time<br>
3 <span style="color: rgb(255, 235, 7);">6 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">8 seconds</span> wear-off time<br>
4 <span style="color: rgb(255, 235, 7);">8 Max Stacks</span>, <span style="color: rgb(112, 36, 172);">10 seconds</span> wear-off time<br>`,
    cost: 2,
    level: 0,
    maxLevel: 4,
    talentGroup: null
  },
  {
    name: "Horde Mastery",
    icon: "horde_mastery.png",
    description: `Gain increased Soul Chance when killing a Horde type mob. <br>
1 <span style="color: rgb(72, 0, 255);">+50%</span><br>
2 <span style="color: rgb(72, 0, 255);">+100%</span><br>
3 <span style="color: rgb(72, 0, 255);">+150%</span><br>
4 <span style="color: rgb(72, 0, 255);">+200%</span><br>
5 <span style="color: rgb(72, 0, 255);">+250%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 5,
    talentGroup: "masteries"
  },
  {
    name: "Assassin Mastery",
    icon: "assassin_mastery.png",
    description: `Gain a stun chance against Assassin type mobs. <br>
1 <span style="color: rgb(25, 166, 228);">5%</span><br>
2 <span style="color: rgb(25, 166, 228);">10%</span><br>
3 <span style="color: rgb(25, 166, 228);">15%</span><br>
4 <span style="color: rgb(25, 166, 228);">20%</span><br>
5 <span style="color: rgb(25, 166, 228);">25%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 5,
    talentGroup: "masteries"
  },
  {
    name: "Dungeon Mastery",
    icon: "dungeon_mastery.png",
    description: `Gain resistance against dungeon mobs. <br>
1 <span style="color: rgb(254, 221, 0);">5%</span><br>
2 <span style="color: rgb(254, 221, 0);">10%</span><br>
3 <span style="color: rgb(254, 221, 0);">15%</span><br>
4 <span style="color: rgb(254, 221, 0);">20%</span><br>
5 <span style="color: rgb(254, 221, 0);">25%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 5,
    talentGroup: "masteries"
  },
  {
    name: "Champion Mastery",
    icon: "champion_mastery.png",
    description: `Gain increased damage against Champions. <br>
1 <span style="color: rgb(194, 54, 39);">10%</span><br>
2 <span style="color: rgb(194, 54, 39);">20%</span><br>
3 <span style="color: rgb(194, 54, 39);">30%</span><br>
4 <span style="color: rgb(194, 54, 39);">40%</span><br>
5 <span style="color: rgb(194, 54, 39);">50%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 5,
    talentGroup: "masteries"
  },
  {
    name: "Fatal Strike",
    icon: "fatal_strike.png",
    description: `Adds Fatal Strike to your Lucky Hits, causing you to deal increased damage with your hit. <br>
1 <span style="color: rgb(194, 54, 39);">+150%</span><br>
2 <span style="color: rgb(194, 54, 39);">+300%</span><br>
3 <span style="color: rgb(194, 54, 39);">+450%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 3,
    talentGroup: "lucky_hit"
  },
  {
    name: "Mana Steal",
    icon: "mana_steal.png",
    description: `Adds Mana Steal to your Lucky Hits, causing you to gain back part of your max mana on your hit. <br>
1 <span style="color: rgb(3, 83, 215);">8%</span><br>
2 <span style="color: rgb(3, 83, 215);">12%</span><br>
3 <span style="color: rgb(3, 83, 215);">24%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 3,
    talentGroup: "lucky_hit"
  },
  {
    name: "Life Leech",
    icon: "life_steal.png",
    description: `Adds Life Leech to your Lucky Hits, causing you to leech back part of your health with your hit, as long as your hit deals the same amount of damage, percentage wise, to the target's total health. <br>
1 <span style="color: rgb(207, 0, 0);">10%</span><br>
2 <span style="color: rgb(207, 0, 0);">20%</span><br>
3 <span style="color: rgb(207, 0, 0);">30%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 3,
    talentGroup: "lucky_hit"
  },
  {
    name: "Cleave",
    icon: "cleave.png",
    description: `Adds a Cleave to your Lucky Hits, causing you to deal part of your damage in a 5 by 5 area around the target. <br>
1 <span style="color: rgb(194, 54, 39);">50%</span><br>
2 <span style="color: rgb(194, 54, 39);">65%</span><br>
3 <span style="color: rgb(194, 54, 39);">80%</span><br>`,
    cost: 2,
    level: 0,
    maxLevel: 3,
    talentGroup: "lucky_hit"
  },
  {
    name: "Throw Power",
    icon: "javelin_throw_power.png",
    description: `Enhances the projectile speed of your Javelins.<br>
<span style="color: rgb(246, 205, 14);">+0.2</span> for each level`,
    cost: 1,
    level: 0,
    maxLevel: 8,
    talentGroup: "javelin"
  },
  {
    name: "Javalin Damage",
    icon: "javelin_damage.png",
    description: `Enhances the damage of your Javelins.<br>
<span style="color: rgb(194, 54, 39);">+10%</span> for each level`,
    cost: 1,
    level: 0,
    maxLevel: 8,
    talentGroup: "javelin"
  },
  {
    name: "Javelin Conduct",
    icon: "javelin_conduct.png",
    description: `Gives your Javelin Conducting Power, making it able to transfer any on-hit effect, except Lucky Hit, to the throw. On-hit effects include Clouds, Stunning and Shocking.`,
    cost: 3,
    level: 0,
    maxLevel: 1,
    talentGroup: "javelin"
  },
  {
    name: "Javelin Ethereal",
    icon: "javelin_ethereal.png",
    description: `Gives you a chance to make your javelin Ethereal, charging no mana for the throw. <br>
1 <span style="color: rgb(255, 235, 7);">15%</span><br>
2 <span style="color: rgb(255, 235, 7);">30%</span><br>
3 <span style="color: rgb(255, 235, 7);">45%</span><br>`,
    cost: 1,
    level: 0,
    maxLevel: 3,
    talentGroup: "javelin"
  }
];

// Functions
function updateGrid(items) {
  if (activeTab === "abilities") {
    const container = abilityGrid;
    container.innerHTML = "";
    items.forEach((item) => {
      if (item.options) {
        createAbilityGroup(container, item);
      } else {
        createSkillDiv(container, item);
      }
    });
  } else {
    const mainGrid = document.getElementById("talent-grid");
    const masteriesGroup = document.getElementById("masteries-group");
    const luckyHitGroup = document.getElementById("lucky_hit-group");
    const javelinGroup = document.getElementById("javelin-group");

    mainGrid.innerHTML = "";
    masteriesGroup.innerHTML = "";
    luckyHitGroup.innerHTML = "";
    javelinGroup.innerHTML = "";

    items.forEach((talent, index) => {
      if (!talent.talentGroup) {
        if (index < 27) {
          // First 21 talents go in the main grid
          createSkillDiv(mainGrid, talent);
        }
      } else {
        // Place talents in their respective groups
        switch (talent.talentGroup) {
          case "masteries":
            createSkillDiv(masteriesGroup, talent);
            break;
          case "lucky_hit":
            createSkillDiv(luckyHitGroup, talent);
            break;
          case "javelin":
            createSkillDiv(javelinGroup, talent);
            break;
        }
      }
    });
  }
  updatePointsRemaining();
}

function createAbilityGroup(container, group) {
  const groupDiv = document.createElement("div");
  groupDiv.classList.add("ability-group");

  group.options.forEach((option) => {
    createSkillDiv(groupDiv, option, group);
  });

  container.appendChild(groupDiv);
}

function createSkillDiv(container, skill, group = null) {
  const div = document.createElement("div");
  div.classList.add("ability");
  if (skill.level > 0) {
    div.classList.add("selected");
  }
  //
  const title = document.createElement("span");
  title.textContent = skill.name;

  const icon = document.createElement("img");
  if (activeTab === "abilities") {
    icon.src = `https://api.vaulthunters.gg/static/sprites/abilities/${skill.icon}`;
  } else if (activeTab === "talents") {
    icon.src = `https://api.vaulthunters.gg/static/sprites/skills/${skill.icon}`;
  }
  icon.alt = skill.name;
  
  const level = document.createElement("span");
  let cost = 0;
  if (group) {
    level.textContent = skill.level + " / " + group.maxLevel;
    cost = group.cost;
  } else if (skill.maxLevel) {
    level.textContent = skill.level + " / " + skill.maxLevel;
    cost = skill.cost;
  }

  div.appendChild(title);
  div.appendChild(icon);
  div.appendChild(level);

  div.addEventListener("mouseenter", () => {
    descriptionText.innerHTML = `<h3 class="description-title">${skill.name}</h3> ${skill.description} <em>(Cost: ${cost})</em>`;
  });

  div.addEventListener("mouseleave", () => {
    descriptionText.textContent =
      "Hover over an ability or talent to see its description. Left click to add a level. Right click to remove a level. Control + click maxes it out.";
  });

  div.addEventListener("click", () => handleSkillClick(skill, group));
  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    handleSkillRightClick(skill, group);
  });

  container.appendChild(div);
}

function handleSkillClick(skill, group) {
  // if it is part of exclusive talents, don't add the point
  if (skill.talentLink && getTalentLevelByName(skill.talentLink) > 0) return;
  
  

  const maxLevel = group ? group.maxLevel : skill.maxLevel;
  const cost = group ? group.cost : skill.cost;

  if (group) {
    if (group.selectedOption && group.selectedOption !== skill) {
      // Transfer points to the new option
      const currentOption = group.selectedOption;
      const pointsToTransfer = currentOption.level;
      currentOption.level = 0;
      skill.level = pointsToTransfer;
      group.selectedOption = skill;
    } else if (group.selectedOption === skill) {
      // Increment level of the selected option
      if (skill.level < maxLevel) {
        if (ctrl_mod) {
          pointsSpent += (maxLevel - skill.level) * cost;
          skill.level = maxLevel;
        } else {
          skill.level++;
          pointsSpent += cost;
        }
      }
    } else {
      // Select this option if none was selected before
      group.selectedOption = skill;
      if (ctrl_mod) {
        pointsSpent += (maxLevel - skill.level) * cost;
        skill.level = maxLevel;
      } else {
        skill.level = 1;
        pointsSpent += cost;
      }
    }
  } else {
    if (skill.level < maxLevel) {
      let levelsToAdd;
      if (ctrl_mod) {
        const maxPossibleLevels = getMaxAddableLevels(skill);
        levelsToAdd = Math.min(maxPossibleLevels, maxLevel - skill.level);
      } else {
        levelsToAdd = getMaxAddableLevels(skill, 1);
      }

      if (levelsToAdd > 0) {
        const pointsToAdd = levelsToAdd * cost;
        pointsSpent += pointsToAdd;
        updateTalentGroupCount(skill, pointsToAdd);
        skill.level += levelsToAdd;
      }
    }
  }

  updatePointsRemaining();
  updateGrid(activeTab === "abilities" ? abilities : talents);
}

function getMaxAddableLevels(skill, desiredLevels = Infinity) {
  if (!skill.talentGroup)
    return Math.min(desiredLevels, skill.maxLevel - skill.level);

  const groupCounts = {
    masteries: masteries_current,
    lucky_hit: lucky_hit_current,
    javelin: javelin_current
  };

  const groupMaxes = {
    masteries: masteries_max,
    lucky_hit: lucky_hit_max,
    javelin: javelin_max
  };

  const remainingPoints =
    groupMaxes[skill.talentGroup] - groupCounts[skill.talentGroup];
  const maxLevelsFromGroupLimit = Math.floor(remainingPoints / skill.cost);

  return Math.min(
    maxLevelsFromGroupLimit,
    desiredLevels,
    skill.maxLevel - skill.level
  );
}

function handleSkillRightClick(skill, group) {
  if (skill.level <= 0) return;

  const cost = group ? group.cost : skill.cost;

  if (ctrl_mod) {
    pointsSpent -= skill.level * cost;
    updateTalentGroupCount(skill, -skill.level * cost);
    skill.level = 0;
  } else {
    skill.level--;
    pointsSpent -= cost;
    updateTalentGroupCount(skill, -cost);
  }

  updatePointsRemaining();
  updateGrid(activeTab === "abilities" ? abilities : talents);
}

function updateTalentGroupCount(skill, change) {
  if (skill.talentGroup === "masteries") masteries_current += change;
  else if (skill.talentGroup === "lucky_hit") lucky_hit_current += change;
  else if (skill.talentGroup === "javelin") javelin_current += change;
}

function getTalentLevelByName(name) {
  const talent = talents.find((talent) => talent.name === name);
  return talent ? talent.level : null; // Return the level if the talent is found, otherwise return null
}

function updatePointsRemaining() {
  requiredLevelDisplay.textContent = pointsSpent;
  if (pointsSpent > MAX_SKILLPOINTS) {
    requiredLevelDisplay.classList.add("red");
  } else {
    requiredLevelDisplay.classList.remove("red");
  }
  document.getElementById(
    "masteries"
  ).textContent = `Masteries: ${masteries_current}/${masteries_max}`;
  document.getElementById(
    "lucky_hit"
  ).textContent = `Lucky hit: ${lucky_hit_current}/${lucky_hit_max}`;
  document.getElementById(
    "javelin_enhancements"
  ).textContent = `Javelin Enhancements: ${javelin_current}/${javelin_max}`;
}

// Listen for when any key is pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "Control") {
    ctrl_mod = true;
  }
});

// Listen for when any key is released
document.addEventListener("keyup", function (event) {
  if (event.key === "Control") {
    ctrl_mod = false;
  }
});

abilitiesTab.addEventListener("click", () => {
  talentsTab.classList.remove("active");
  abilitiesTab.classList.add("active");
  activeTab = "abilities";
  updateGrid(abilities);
  abilityGrid.style.display = "grid";
  talentContainer.style.display = "none";
});

talentsTab.addEventListener("click", () => {
  talentsTab.classList.add("active");
  abilitiesTab.classList.remove("active");
  activeTab = "talents";
  updateGrid(talents);
  abilityGrid.style.display = "none";
  talentContainer.style.display = "grid";
});

function init(active_tab) {
  if (active_tab = 'abilities') {
    activeTab = 'abilities';
    updateGrid(abilities);
    abilityGrid.style.display = 'grid';
    talentContainer.style.display = 'none';    
  } else {
    activeTab = "talents";
    updateGrid(talents);
    abilityGrid.style.display = "none";
    talentContainer.style.display = "grid";
  }
    updatePointsRemaining();
}

// Function to export abilities and talents
function exportData(abilities, talents) {
  // Export abilities
  const abilitiesExport = abilities
    .map(ability => {
      if (ability.selectedOption && ability.selectedOption.level > 0) {
        return `${ability.selectedOption.name}:${ability.selectedOption.level}`;
      }
      return null;
    })
    .filter(Boolean) // Remove nulls
    .join('|');

  // Export talents
  const talentsExport = talents
    .map(talent => {
      if (talent.level > 0) {
        return `${talent.name}:${talent.level}`;
      }
      return null;
    })
    .filter(Boolean) // Remove nulls
    .join('|');

  // Combine both abilities and talents
  return `${abilitiesExport};${talentsExport}`;
}

// Function to copy data to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    
  }).catch(err => {
    console.error('Failed to copy data: ', err);
  });
}

// Function to import data with corrected handling of maxLevel
function importData(data) {
  const [abilitiesData, talentsData] = data.split(';');

  // Create maps for quick lookup
  const abilitiesMap = new Map();
  abilities.forEach(ability => {
    ability.options.forEach(option => {
      // Store both the option and its parent ability in the map
      abilitiesMap.set(option.name, { option, ability });
    });
  });

  const talentsMap = new Map();
  talents.forEach(talent => {
    talentsMap.set(talent.name, talent);
  });

  // Temporary storage to hold validated data before committing
  const newAbilities = [];
  const newTalents = [];

  // Validate and process abilities data
  if (abilitiesData) {
    const abilitiesValid = abilitiesData.split('|').every(entry => {
      const [name, level] = entry.split(':');
      const parsedLevel = parseInt(level, 10);

      // Check if the ability option exists
      if (!abilitiesMap.has(name)) {
        console.error(`Ability option "${name}" does not exist.`);
        return false;
      }

      // Get the option and its parent ability
      const { option, ability } = abilitiesMap.get(name);

      // Check if the level is within the valid range of the ability's maxLevel
      if (parsedLevel < 0 || parsedLevel > ability.maxLevel) {
        console.error(`Invalid level "${parsedLevel}" for ability "${ability.name}" (max level: ${ability.maxLevel}).`);
        return false;
      }

      // Store valid abilities for later processing
      newAbilities.push({ name, level: parsedLevel, option, ability });
      return true;
    });

    if (!abilitiesValid) {
      return false; // Abort if any ability check fails
    }
  }

  // Validate and process talents data
  if (talentsData) {
    const talentsValid = talentsData.split('|').every(entry => {
      const [name, level] = entry.split(':');
      const parsedLevel = parseInt(level, 10);

      // Check if the talent exists
      if (!talentsMap.has(name)) {
        console.error(`Talent "${name}" does not exist.`);
        return false;
      }

      // Check if the level is within the valid range
      const talent = talentsMap.get(name);
      if (parsedLevel < 0 || parsedLevel > talent.maxLevel) {
        console.error(`Invalid level "${parsedLevel}" for talent "${name}".`);
        return false;
      }

      // Store valid talents for later processing
      newTalents.push({ name, level: parsedLevel, talent });
      return true;
    });

    if (!talentsValid) {
      return false; // Abort if any talent check fails
    }
  }

  // All checks passed, proceed with updating abilities and talents

  // Reset existing abilities and talents
  abilities.forEach(ability => {
    ability.selectedOption = null;
    ability.options.forEach(option => {
      option.level = 0;
    });
  });

  talents.forEach(talent => {
    talent.level = 0;
  });

  // Update abilities
  newAbilities.forEach(({ name, level, option, ability }) => {
    option.level = level;
    ability.selectedOption = option;
  });

  // Update talents
  newTalents.forEach(({ name, level, talent }) => {
    talent.level = level;
  });

  // Recalculate points and reinitialize
  calculatePoints();
  init('abilities');

  return true; // Return true if all data was successfully processed
}

function serializeBuild() {
    const abilitiesData = abilities
      .filter(ability => ability.selectedOption)
      .map(ability => `${ability.selectedOption.name}:${ability.selectedOption.level}`)
      .join('|');
  
    const talentsData = talents
      .filter(talent => talent.level > 0)
      .map(talent => `${talent.name}:${talent.level}`)
      .join('|');
  
    return `${abilitiesData};${talentsData}`;
  }
  
  function generateShareableLink() {
    const buildString = serializeBuild();
    const encodedBuild = encodeURIComponent(buildString);
    const shareableURL = `${window.location.origin}${window.location.pathname}?build=${encodedBuild}`;
    return shareableURL;
  }
  
  function loadBuildFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const build = urlParams.get('build');
  
    if (build) {
      const decodedBuild = decodeURIComponent(build);
      importData(decodedBuild);  // Reuse your existing import function
    }
  }

  

function calculatePoints() {
  abilities.forEach(ability => {
    let cost = ability.cost;
    ability.options.forEach(option => {
      pointsSpent += option.level * cost;
    });
  });
  
  const groupCounts = {
    masteries: masteries_current,
    lucky_hit: lucky_hit_current,
    javelin: javelin_current
  };
  
  talents.forEach(talent => {
    pointsSpent += talent.level * talent.cost;
    if (talent.talentGroup) {
      updateTalentGroupCount(talent, talent.cost * talent.level)
    }
  })
}

function showToast(message) {
  var toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  // Hide the toast after 5 seconds
  setTimeout(function() {
    toast.classList.remove("show");
  }, 5000);
}

// button click event export button
document.getElementById('export-button').addEventListener('click', () => {
  const result = exportData(abilities, talents);
  console.log(result);
  copyToClipboard(result);
  showToast("Build string exported!");
});

// button click event share button
document.getElementById('share-button').addEventListener('click', () => {
    const shareableLink = generateShareableLink();
    const linkInput = document.getElementById('shareable-link');
    linkInput.value = shareableLink;
    linkInput.select();
    document.execCommand('copy');
    showToast('Build link copied to clipboard!');
  });

// Event listener for the import button
document.getElementById('importButton').addEventListener('click', () => {
  const data = document.getElementById('pasteArea').value;
  if (data.trim()) {
    result = importData(data);
    if (!result) {
      showToast("Import failed.")
    } else {
      showToast("Build succesfully imported!");
      document.getElementById("pasteArea").value = "";
    }
  } else {
    showToast("Import failed.");
  }
});

init('abilities')

window.addEventListener('load', () => {
    loadBuildFromURL();
  });