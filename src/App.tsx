import { useState } from 'react';
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";

const DiabetesRiskCalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('');
  const [result, setResult] = useState('');
  const [bmi, setBmi] = useState('');
  const [theme, setTheme] = useState('light');

  const calculateRisk = (e) => {
    e.preventDefault();
    let riskScore = 0;

    if (age > 45) {
      riskScore += 1;
    }

    const calculatedBmi = weight / (height / 100) ** 2;
    setBmi(calculatedBmi.toFixed(2));

    if (calculatedBmi > 30) {
      riskScore += 1;
    }

    if (familyHistory === 'yes') {
      riskScore += 1;
    }

    if (physicalActivity === 'sedentary') {
      riskScore += 1;
    }

    if (riskScore >= 3) {
      setResult('High');
    } else if (riskScore >= 2) {
      setResult('Moderate');
    } else {
      setResult('Low');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`max-w-md mx-auto p-4 mt-12 bg-${theme === 'light' ? 'white' : 'gray-900'} rounded-lg shadow-md`}>
      <h1 className={`text-3xl font-bold mb-4 text-green-400`}>Diabetes Risk Calculator</h1>
      <form onSubmit={calculateRisk}>
        <div className="mb-4">
          <Label htmlFor="age" className={`text-green-400`}>Age</Label>
          <Input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="weight" className={`text-green-400`}>Weight (kg)</Label>
          <Input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="height" className={`text-green-400`}>Height (cm)</Label>
          <Input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="familyHistory" className={`text-green-400`}>Family History of Diabetes</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="physicalActivity" className={`text-green-400`}>Physical Activity Level</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary</SelectItem>
              <SelectItem value="lightlyActive">Lightly Active</SelectItem>
              <SelectItem value="moderatelyActive">Moderately Active</SelectItem>
              <SelectItem value="veryActive">Very Active</SelectItem>
              <SelectItem value="extraActive">Extra Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Calculate Risk</Button>
        {result && (
          <p className={`mt-4 text-lg font-bold text-green-400`}>
            Your risk of developing diabetes is: <span className={`text-green-400`}>{result}</span>
          </p>
        )}
        {bmi && (
          <p className={`mt-4 text-lg font-bold text-green-400`}>
            Your BMI is: <span className={`text-green-400`}>{bmi}</span>
          </p>
        )}
      </form>
      <Button onClick={toggleTheme} className="mt-4">Toggle Theme</Button>
    </div>
  );
};

export default DiabetesRiskCalculator;