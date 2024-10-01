import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import example from '@renderer/assets/example.webp'
import InfoIcon from '@mui/icons-material/Info'

export const WorkersAccordion = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Как пользоваться загрузчиком <InfoIcon sx={{ ml: 2 }} />
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">
            Загрузчик принимает только xlsx и xls файлы. Формат таблицы должен быть только таким как
            на картинке, иначе есть риск что данные будут битые. Старые данные будут стёрты.
          </Typography>
          <Typography variant="subtitle2">
            После загрузки, создадутся таблицы:
            <ul>
              <li>С полным списком сотрудников с привязкой к подразделению</li>
              <li>С списком подразделений</li>
            </ul>
          </Typography>
          <Box sx={{ mt: 3, maxWidth: '900px' }}>
            <img src={example} width="100%" height="auto" />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
