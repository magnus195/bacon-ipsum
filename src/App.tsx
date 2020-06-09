import React, {useState} from 'react';
import './App.css';
import {Button, Container, Form, Input} from 'reactstrap';

async function generateIpsumWordlist() {
    const request = await fetch('/bacon-ipsum/wordlist.txt')
    const text = await request.text()
    const wordArray = await text.split("\n")
    return wordArray
}

function App() {
    const [ipsum, setIpsum] = useState("")

    async function generateBaconIpsum(e: Event) {
        e.preventDefault()
        let wordsValue = e.target[0].value
        let wordArray = await generateIpsumWordlist()
        let ipsum: Array<String> = ["Bacon", "ipsum"]
        console.log(wordArray)
        while (ipsum.length < wordsValue) {
            let randomNumber = (Math.floor(Math.random() * wordArray.length))
            let randomPunctuation = Math.random()
            //console.log(randomPunctuation)
            if (randomPunctuation > 0.80) {
                let capitalizedWord = wordArray[randomNumber].charAt(0).toUpperCase() + wordArray[randomNumber].slice(1)
                //console.log(capitalizedWord)
                ipsum[ipsum.length - 1] += "."
                ipsum.push(capitalizedWord)
            }
            ipsum.push(wordArray[randomNumber])
        }
        setIpsum(ipsum.join(" "));
    }

    return (
        <div className="App">
            <Container>
                <h1>Bacon Ipsum</h1>
                <Form onSubmit={generateBaconIpsum} inline>
                    <Input type={"range"} min={50} max={2000}/>
                    <Button type={"submit"}>Generate</Button>
                </Form>
                <p>{ipsum}</p>
            </Container>
        </div>
    );
}

export default App;
