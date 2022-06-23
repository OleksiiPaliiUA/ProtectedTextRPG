import { character, item, location, player } from './models.js'
//import { validateMnemonic } from './bip39.js'
//import { mnemonicToSeed } from '../node_modules/react-native-bip39/index.js'
//import chai from './chai.js'


async function GetAllLocationsToArray(){
    let locations = []
    await $.getJSON('../server/locations.json', function (json) {
        for(let i = 0; i < Object.keys(json).length; i++){
            let tmp = new location(
                json[i]['id'],
                json[i]['name'],
                json[i]['text'],
                json[i]['buttonText']
            )
            locations.push(tmp)
        }
    })
    return locations
}

async function GetAllItemsToArray(){
    let items = []
    await $.getJSON('../server/items.json', function (json) {
        for(let i = 0; i < Object.keys(json).length; i++){
            let tmp = new item(
                json[i]['id'],
                json[i]['level'],
                json[i]['name'],
                json[i]['ownerId'],
                json[i]['requiredRole'],
                json[i]['slotName'],
                json[i]['rarity'],
                json[i]['changeHealth'],
                json[i]['changeMana'],
                json[i]['changeDamage'],
                json[i]['changeDodge']
            )
            items.push(tmp)
        }
    })
    return items
}

async function GetCharacter(){
    let playedCharacter
    await $.getJSON('../server/character.json', function (json) {
        playedCharacter = new character(
            json['id'],
            json['name'],
            json['level'],
            json['gold'],
            json['experience'],
            json['upgradePoints'],
            json['role'],
            json['currentLocation'],
            json['head'],
            json['body'],
            json['gloves'],
            json['ring'],
            json['belt'],
            json['legs'],
            json['strength'],
            json['agility'],
            json['intelligence'],
            json['charisma'],
            json['sizeInventory'],
            json['inventory']
        )
    })
    return playedCharacter
}

async function GetPlayer(){
    let playerParams
    await $.getJSON('../server/player.json', function (json) {
        playerParams = new player(
            json['login'],
            json['password'],
            json['mnemonicCode']
        )
    })
    return playerParams
}

function saveAsJSON(data, name) {
    const a = document.createElement('a')
    a.download = name
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], {type: 'application/json'}))
    a.click()
}

let playerParams = await GetPlayer()
let testcharacter = await GetCharacter()
let locations = await GetAllLocationsToArray()
let items = await GetAllItemsToArray()


//saveAsJSON(testcharacter, 'character.json')

let inventoryItems = testcharacter.inventory
let selectedSlot

function UpdateDocument(){
    testcharacter.CheckForLevelUp()
    $("#roleImage").attr("src", "images/"+(testcharacter.role).toString()+"class.png")
    $("#characterName").text(testcharacter.name)
    $("#characterId").text(testcharacter.id)
    $("#characterRole").text(testcharacter.GetRoleInString())
    $("#characterLevel").text(testcharacter.level)
    $("#characterExperience").text(testcharacter.experience + '/' + testcharacter.GetNeededExperienceForNewLevel())
    $("#characterUpgradePoints").text(testcharacter.upgradePoints)
    $("#characterStrength").text(testcharacter.strength)
    $("#characterAgility").text(testcharacter.agility)
    $("#characterIntelligence").text(testcharacter.intelligence)
    $("#characterCharisma").text(testcharacter.charisma)
    $("#characterGold").text(testcharacter.gold)
    $("#completedLocations").text(testcharacter.currentLocation)
    if(testcharacter.head == 0 && testcharacter.body == 0 && testcharacter.ring == 0 && testcharacter.gloves == 0 && testcharacter.belt == 0 && testcharacter.legs == 0) {
        $("#characterHealth").text(testcharacter.GetHealthPoint())
        $("#characterMana").text(testcharacter.GetManaPoint())
        $("#characterDamage").text(testcharacter.GetDamagePoint())
        $("#characterDodge").text(testcharacter.GetDodgePoint())
        $("#undressAll").addClass("disabled")
    }
    else {
        let totalHealth = testcharacter.GetHealthPoint()
        let totalMana = testcharacter.GetManaPoint()
        let totalDamage = testcharacter.GetDamagePoint()
        let totalDodge = testcharacter.GetDodgePoint()
        $("#undressAll").removeClass("disabled")
        if(testcharacter.head != 0){
            totalHealth += items[testcharacter.head-1].changeHealth
            totalMana += items[testcharacter.head-1].changeMana
            totalDamage += items[testcharacter.head-1].changeDamage
            totalDodge += items[testcharacter.head-1].changeDodge
        }
        if(testcharacter.body != 0){
            totalHealth += items[testcharacter.body-1].changeHealth
            totalMana += items[testcharacter.body-1].changeMana
            totalDamage += items[testcharacter.body-1].changeDamage
            totalDodge += items[testcharacter.body-1].changeDodge
        }
        if(testcharacter.gloves != 0){
            totalHealth += items[testcharacter.gloves-1].changeHealth
            totalMana += items[testcharacter.gloves-1].changeMana
            totalDamage += items[testcharacter.gloves-1].changeDamage
            totalDodge += items[testcharacter.gloves-1].changeDodge
        }
        if(testcharacter.ring != 0){
            totalHealth += items[testcharacter.ring-1].changeHealth
            totalMana += items[testcharacter.ring-1].changeMana
            totalDamage += items[testcharacter.ring-1].changeDamage
            totalDodge += items[testcharacter.ring-1].changeDodge
        }
        if(testcharacter.belt != 0){
            totalHealth += items[testcharacter.belt-1].changeHealth
            totalMana += items[testcharacter.belt-1].changeMana
            totalDamage += items[testcharacter.belt-1].changeDamage
            totalDodge += items[testcharacter.belt-1].changeDodge
        }
        if(testcharacter.legs != 0){
            totalHealth += items[testcharacter.legs-1].changeHealth
            totalMana += items[testcharacter.legs-1].changeMana
            totalDamage += items[testcharacter.legs-1].changeDamage
            totalDodge += items[testcharacter.legs-1].changeDodge
        }
        $("#characterHealth").text(totalHealth) 
        $("#characterMana").text(totalMana)
        $("#characterDamage").text(totalDamage)
        $("#characterDodge").text(totalDodge)
            
    }
    $("#locationName").text(locations[testcharacter.currentLocation-1].name)
    $("#locationText").text(locations[testcharacter.currentLocation-1].text)
    $("#locationNext").text(locations[testcharacter.currentLocation-1].buttonText)
    if(testcharacter.upgradePoints == 0) {
        $("#buttonStrengthPlus").addClass("disabled")
        $("#buttonAgilityPlus").addClass("disabled")
        $("#buttonIntelligencePlus").addClass("disabled")
        $("#buttonCharismaPlus").addClass("disabled")
    }
    if(testcharacter.upgradePoints != 0) {
        $("#buttonStrengthPlus").removeClass("disabled")
        $("#buttonAgilityPlus").removeClass("disabled")
        $("#buttonIntelligencePlus").removeClass("disabled")
        $("#buttonCharismaPlus").removeClass("disabled")
    }
    for(let i = 1; i <= testcharacter.sizeInventory; i++){
        $("#inventory #"+i).removeClass("slotHide")
        $("#inventory #"+i).addClass("slot")
    }
}

$("#gameScreen").hide()

$(function() {
    //alert(mnemonicToSeed('basket asket'))
    UpdateDocument()
    $("#buttonStrengthPlus").click(function() {
        testcharacter.strength++
        testcharacter.upgradePoints--
        testcharacter.sizeInventory++
        UpdateDocument()
    })
    $("#buttonAgilityPlus").click(function() {
        testcharacter.agility++
        testcharacter.upgradePoints--
        UpdateDocument()
    })
    $("#buttonIntelligencePlus").click(function() {
        testcharacter.intelligence++
        testcharacter.upgradePoints--
        UpdateDocument()
    })
    $("#buttonCharismaPlus").click(function() {
        testcharacter.charisma++
        testcharacter.upgradePoints--
        UpdateDocument()
    })
    $(".slot").click(function() {
        selectedSlot = this.id
        $("td").removeClass("slotSelected")
        $("#inventory #" + this.id).addClass("slotSelected")
        try {
            $("#itemId").text(items[inventoryItems[selectedSlot-1]-1].id)
            $('#itemName').text(items[inventoryItems[selectedSlot-1]-1].name)
            $('#itemLevel').text(items[inventoryItems[selectedSlot-1]-1].level)
            $('#itemRequiredRole').text(items[inventoryItems[selectedSlot-1]-1].GetRoleInString())
            $('#itemSlotName').text(items[inventoryItems[selectedSlot-1]-1].GetSlotNameInString())
            $('#itemRarity').text(items[inventoryItems[selectedSlot-1]-1].GetRarityInString())
            $('#itemChangeHealth').text(items[inventoryItems[selectedSlot-1]-1].changeHealth)
            $('#itemChangeMana').text(items[inventoryItems[selectedSlot-1]-1].changeMana)
            $('#itemChangeDamage').text(items[inventoryItems[selectedSlot-1]-1].changeDamage)
            $('#itemChangeDodge').text(items[inventoryItems[selectedSlot-1]-1].changeDodge)
        }
        catch (TypeError) {
            $("#itemId").text('')
            $('#itemName').text('')
            $('#itemLevel').text('')
            $('#itemRequiredRole').text('')
            $('#itemSlotName').text('')
            $('#itemRarity').text('')
            $('#itemChangeHealth').text('')
            $('#itemChangeMana').text('')
            $('#itemChangeDamage').text('')
            $('#itemChangeDodge').text('')
        }
    })
    $("#locationNext").click(function () {
        if(testcharacter.currentLocation == locations.length){
            alert('end')
            $("#locationNext").addClass("disabled")
            return
        }
        testcharacter.MoveToNextLocation()
        testcharacter.AddExperienceFromLocation()
        UpdateDocument()
    })
    $("#itemPutOn").click(function () {
        try {
            if(selectedSlot > inventoryItems.length){
                alert('Пустий слот')
                return
            }
            if(items[inventoryItems[selectedSlot-1]-1].requiredRole != testcharacter.role){
                alert('Невідповідний клас предмету і персонажу')
                return
            }
            if(items[inventoryItems[selectedSlot-1]-1].level > testcharacter.level){
                alert('Недостатній рівень персонажу для цього предмету')
                return
            }
            switch(items[inventoryItems[selectedSlot-1]-1].slotName){
                case 1:
                    $("#playerHead").removeClass("slotHide")
                    $("#playerHead").addClass("slotActive")
                    testcharacter.head = items[inventoryItems[selectedSlot-1]-1].id 
                    break
                case 2:
                    $("#playerBody").removeClass("slotHide")
                    $("#playerBody").addClass("slotActive")
                    testcharacter.body = items[inventoryItems[selectedSlot-1]-1].id
                    break
                case 3:
                    $("#playerGloves").removeClass("slotHide")
                    $("#playerGloves").addClass("slotActive")
                    testcharacter.gloves = items[inventoryItems[selectedSlot-1]-1].id
                    break
                case 4:
                    $("#playerRing").removeClass("slotHide")
                    $("#playerRing").addClass("slotActive")
                    testcharacter.ring = items[inventoryItems[selectedSlot-1]-1].id
                    break
                case 5:
                    $("#playerBelt").removeClass("slotHide")
                    $("#playerBelt").addClass("slotActive")
                    testcharacter.belt = items[inventoryItems[selectedSlot-1]-1].id
                    break
                case 6:
                    $("#playerLegs").removeClass("slotHide")
                    $("#playerLegs").addClass("slotActive")
                    testcharacter.legs = items[inventoryItems[selectedSlot-1]-1].id
                    break    
            }
            UpdateDocument()
        }
        catch (TypeError){
            alert('Немає вибраного слоту')
        }
    })
    $("#undressAll").click(function () {
        $("#playerHead").addClass("slotHide")
        $("#playerBody").addClass("slotHide")
        $("#playerGloves").addClass("slotHide")
        $("#playerRing").addClass("slotHide")
        $("#playerBelt").addClass("slotHide")
        $("#playerLegs").addClass("slotHide")
        testcharacter.head = 0
        testcharacter.body = 0
        testcharacter.gloves = 0
        testcharacter.ring = 0
        testcharacter.belt = 0
        testcharacter.legs = 0
        UpdateDocument()
    })
    $("#playerAuth").click(function () {
        if($("#playerLogin").val() == playerParams.login) {
            if($("#playerPassword").val() == playerParams.password) {
                if($("#playerMnemonicCode").val() == playerParams.mnemonicCode) {
                    alert('Авторизація успішна')
                    $("#authScreen").remove()
                    $("#gameScreen").show()
                }
                else {
                    alert('Невірна код-фраза')
                }
            }
            else {
                alert('Невірний пароль')
            }   
        }
        else {
            alert('Невірний логін')
        }
    })
})