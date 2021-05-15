    let model;
    let targetLabel = 'C';
    let state = "collection";

    function setup() {
        createCanvas(400, 400);
        background(255,127,80);

        const options = {
            inputs: ['x','y'],
            outputs: ['label'],
            task:'classification',
            debug:'true'
        };
        model = ml5.neuralNetwork(options);
     }

    function keyPressed(){
        if(key == 't'){
            state = "trainig";
            console.log('Trainig Stated!');
            model.normalizeData();
            const options ={
                epochs:200
            };
            model.train(options, whileTraining, finishedTraining);
        }else{
            targetLabel = key.toUpperCase();
        }
    }

    function whileTraining (epoch, loss){
        console.log(epoch);
    }

    function finishedTraining(){
        console.log('Trainin Finished !');
        state= "prediction";
    }

    function mousePressed(){

        let inputs = {
            x: mouseX,
            y: mouseY
        };

        if(state == "collection"){
            let target = {
                label:targetLabel
            };
            model.addData(inputs, target);
            stroke(0);
            noFill();
            ellipse(mouseX, mouseY, 24);
            fill(0);
            noStroke();
            textAlign(CENTER,CENTER);
            text(targetLabel, mouseX, mouseY);
        }else if (state == "prediction"){
            model.classify(inputs,gotResults);
        }

    }

    function gotResults(error, results){
        if(error){
            console.log(error);
            return;
        }else{
            const key = results[0].label;
            const color = ( key == 'D' ? [0,255,0] : 
                            ( key == 'C' ? [0,255,255] : [128,0,0] )
                          );

            console.log(results);
            stroke(0);
            fill(color);
            ellipse(mouseX, mouseY, 24);
            fill(0);
            noStroke();
            textAlign(CENTER,CENTER);
            text(key, mouseX, mouseY);
        }
    }