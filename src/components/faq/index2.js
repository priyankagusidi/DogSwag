import { Container, Title, Accordion, createStyles, rem } from '@mantine/core';
      import { Pagination } from '@mantine/core';
import {useState} from 'react'
import Data from './data'
const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    
  },
}));
  
const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

export default function FaqSimple() {
  const { classes } = useStyles();
  const [activePage, setPage] = useState(1);

  // function setPageNo(){
  //     setPage(activePage)
  // }

 console.log(activePage)
  return (
    <div className="p-2 md:p-5">
    <Container className="max-w-[1000px]  mx-auto pt-10">
      <Title align="center" className="font-bold text-2xl">
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated" className="m-5 h-96 p-2 overflow-y-scroll">

      {
        Data.slice(5*(activePage-1),5*activePage).map((m,i)=>{
          return(
                <Accordion.Item key={i} className="border border-gray-300" value={m.question}>
                  <Accordion.Control>{m.question}</Accordion.Control>
                  <Accordion.Panel>{m.answer}</Accordion.Panel>
                </Accordion.Item>
            )
        })
      }
        
      </Accordion>
      <div className="flex justify-center">
      <Pagination value={activePage} onChange={setPage} color="orange" total={5}/>
      </div>
    </Container>
    </div>
  );
}