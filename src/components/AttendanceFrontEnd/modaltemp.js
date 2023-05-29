import React, { useState } from "react";
import {
  Grid,
  Column,
  DatePicker,
  DatePickerInput,
  Button,
  Form,
  DefinitionTooltip,
  Slider,
  Modal,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  StructuredListInput,
} from "@carbon/react";

import { format, differenceInDays } from 'date-fns'

function MyForm() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [yourLeave, setYourLeave] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [percent, setPercent] = useState([0, 0, 0, 0, 0, 0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const diffInDays = differenceInDays(date2[0], date1[0]);
    const totalDays = diffInDays + 1;

    var weekends = Math.floor(totalDays / 7) * 2;

    if (totalDays % 7 === 5) {
      weekends += 1;
    } else if (totalDays % 7 === 6) {
      weekends += 2;
    }

    var workdays = totalDays - weekends;

    var holidays = [0, 0, 0, 0, 0, 0, 0];
    var tot_per = [0, 0, 0, 0, 0, 0, 0];
    var att_per = [0, 0, 0, 0, 0, 0, 0];

    const daySubMatrix = [
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 2, 1],
      [0, 0, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1]
    ];

    const leaves = yourLeave.map((leave, index) => leave + holidays[index]);

    for (let i = 0; i < workdays; i++) {
      const x = i % 5;
      if (holidays[x] > 0) {
        holidays[x] -= 1;
        continue;
      }
      for (let j = 0; j < 6; j++) {
        tot_per[j] += daySubMatrix[x][j];
      }
    }

    for (let i = 0; i < workdays; i++) {
      const x = i % 5;
      if (leaves[x] > 0) {
        leaves[x] -= 1;
        continue;
      }
      for (let j = 0; j < 6; j++) {
        att_per[j] += daySubMatrix[x][j];
      }
    }

    for (let i = 0; i < 6; i++) {
      setPercent(prevPercent => [...prevPercent, Math.round((att_per[i] / tot_per[i]) * 100,4)]);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Column lg={{ span: 4, offset: 4 }} md={8} sm={4}>
            <DatePicker
              className="nxx"
              dateFormat="d/m/Y"
              id="start-date-picker"
              datePickerType="single"
              value={date1}
              onChange={(date1) => setDate1(date1)}
            >
              <DatePickerInput
                id="start-date-picker-input-id"
                placeholder="dd/mm/yyyy"
                labelText="Start Date"
                onChange={(event) => setDate1(event.target.value)}
              />
            </DatePicker>
          </Column>

          <Column lg={{ span: 4, offset: 0 }} md={8} sm={4}>
            <DatePicker
              dateFormat="d/m/Y"
              id="date-picker"
              datePickerType="single"
              value={date2}
              onChange={(date2) => setDate2(date2)}
            >
              <DatePickerInput
                id="end-date-picker-input-id"
                placeholder="dd/mm/yyyy"
                labelText="End Date"
                onChange={(event) => setDate2(event.target.value)}
              />
            </DatePicker>
          </Column>

          <Column lg={{ span: 8, offset: 7 }} md={8} sm={{ span: 4, offset: 0 }}>
            <h2 style={{ marginTop: "50px", marginBottom: "20px" }}>Your Leave Days</h2>
            <DefinitionTooltip style={{ marginBottom: "30px" }} definition="Enter the number of days you took leave. For example, if you took 2 leaves on Monday within the selected dates above, enter 2 similarly for other days too.">
              <p>Need help?</p>
            </DefinitionTooltip>
          </Column>

          <Column lg={{ span: 4, offset: 2 }} md={{ span: 8, offset: 2 }} sm={{ span: 4, offset: 0 }}>
            <p>Tuesday</p>
            <Slider
              max={5}
              min={0}
              value={yourLeave[0]}
              onChange={(event) => setYourLeave([event.value, yourLeave[1], yourLeave[2], yourLeave[3], yourLeave[4], yourLeave[5]])}
            />
            <p>Wednesday</p>
            <Slider
              max={5}
              min={0}
              value={yourLeave[1]}
              onChange={(event) =>
                setYourLeave([
                  yourLeave[0],
                  event.value,
                  yourLeave[2],
                  yourLeave[3],
                  yourLeave[4],
                  yourLeave[5],
                ])
              }
            />
            <p>Thursday</p>
            <Slider
              max={5}
              min={0}
              value={yourLeave[2]}
              onChange={(event) =>
                setYourLeave([
                  yourLeave[0],
                  yourLeave[1],
                  event.value,
                  yourLeave[3],
                  yourLeave[4],
                  yourLeave[5],
                ])
              }
            />
          </Column>

          <Column lg={{ span: 8, offset: 10 }} md={{ span: 4, offset: 2 }} sm={{ span: 4, offset: 0 }}>
            <p>Friday</p>
            <Slider
              max={5}
              min={0}
              value={yourLeave[3]}
              onChange={(event) =>
                setYourLeave([
                  yourLeave[0],
                  yourLeave[1],
                  yourLeave[2],
                  event.value,
                  yourLeave[4],
                  yourLeave[5],
                ])
              }
            />
            <p>Saturday</p>
            <Slider
              max={5}
              min={0}
              value={yourLeave[4]}
              onChange={(event) =>
                setYourLeave([
                  yourLeave[0],
                  yourLeave[1],
                  yourLeave[2],
                  yourLeave[3],
                  event.value,
                  yourLeave[5],
                ])
              }
            />
            <p>Monday</p>
            <Slider
              max={5}
              min={0}
              disabled={true}
              value={0}
              onChange={(event) =>
                setYourLeave([
                  yourLeave[0],
                  yourLeave[1],
                  yourLeave[2],
                  yourLeave[3],
                  yourLeave[4],
                  event.value,
                ])
              }
            />
          </Column>

          <Column lg={{ span: 4, offset: 6 }} md={8} sm={{ span: 4, offset: 0 }}>
            <Button type="submit" style={{ display: 'block', margin: '10px auto', marginBottom: "20px" }}>Submit</Button>
          </Column>
        </Grid>
      </Form>

      <Modal
        open={isModalOpen}
        onRequestClose={toggleModal}
        modalHeading="Percent Values"
        primaryButtonText="Close"
        secondaryButtonText="Submit Again"
        onSecondarySubmit={handleSubmit}
      >
        
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Day</StructuredListCell>
              <StructuredListCell head>Percent</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {percent.map((value, index) => (
              <StructuredListRow key={index}>
                <StructuredListCell>{["Protection and", "Wednesday", "Thursday", "Friday", "Saturday", "Monday"][index]}</StructuredListCell>
                <StructuredListCell>{value}%</StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </Modal>
    </>
  );
};

export default MyForm;