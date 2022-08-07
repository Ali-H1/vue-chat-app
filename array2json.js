function array2json(arr){
    obj={}
    for (item in arr){
        item = arr[item]
        console.log(item)
        obj[item.date.year.toString()+item.date.mounth.toString()+item.date.day.toString()+item.time+item.message] = item
    }
    return obj
}

a = (array2json([
    {
        "message": "hello",
        "time": "10:50",
        "date": {
            "day": 17,
            "year": 2022,
            "mounth": 5
        },
        "sender_data": {
            "img": "https://lh3.googleusercontent.com/a/AATXAJw4A3oEP_u5Gc0jlLPUjH6iPIuQgdGmAKnfiDzB=s96-c",
            "uid": "107754215595909491277",
            "name": "Host mail"
        }
    },
    {
        "time": "22:9",
        "sender_data": {
            "img": "https://lh3.googleusercontent.com/a/AATXAJxCfNqzwXomJ1VikNRRpFS_ab9TU7rlZWPMok8o=s96-c",
            "uid": "112301307050079333179",
            "name": "Ali Haddadi"
        },
        "message": "hi",
        "date": {
            "mounth": 5,
            "year": 2022,
            "day": 28
        }
    },
    {
        "time": "22:9",
        "sender_data": {
            "img": "https://lh3.googleusercontent.com/a/AATXAJxCfNqzwXomJ1VikNRRpFS_ab9TU7rlZWPMok8o=s96-c",
            "name": "Ali Haddadi",
            "uid": "112301307050079333179"
        },
        "date": {
            "day": 28,
            "year": 2022,
            "mounth": 5
        },
        "message": "whats up?"
    },
    {
        "date": {
            "day": 31,
            "mounth": 5,
            "year": 2022
        },
        "sender_data": {
            "name": "Ali Haddadi",
            "img": "https://lh3.googleusercontent.com/a/AATXAJxCfNqzwXomJ1VikNRRpFS_ab9TU7rlZWPMok8o=s96-c",
            "uid": "112301307050079333179"
        },
        "message": "how r u?",
        "time": "14:33"
    }
]))
